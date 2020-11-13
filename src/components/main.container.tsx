import React from 'react';
import {ImageInterface, imagesInitialState,videoUri, videoPlayerWidth} from '../common';
import { MainComponent } from './main.component';
import {isImageInTimeRange, maxOcurrencesNotReached, isShowingNow} from './main.business'

interface Props {
}

type ImagesState = {[name:string]: ImageInterface};

export const MainContainer: React.FC<Props> = (props) => {
    const [imagesState, setImagesState] = React.useState(imagesInitialState);

    const progressUpdate = (currentTime: number) => {
        if(!currentTime) return;

        let newState: {[name: string]: ImageInterface} = {} as ImagesState;
        newState = updateImageState(currentTime, "image1", newState);
        newState = updateImageState(currentTime, "image2", newState);
        newState = updateImageState(currentTime, "image3", newState);

        if (newState && Object.keys(newState).length>0) {
            console.log("State updated");
            setImagesState(newState);
        } 
    };

    const updateImageState = 
        (time : number, imageName : string, newStateReceived: {[name: string]:ImageInterface}) : {[name: string]:ImageInterface}=> {
            if(!time || !imageName) return newStateReceived;
            let stateToReturn = newStateReceived;
            
            const currentImage = imagesState[imageName];            
            const timeRange: boolean = isImageInTimeRange(time, currentImage);
            const isShowing: boolean = isShowingNow(currentImage);
            const allowedToShow: boolean = maxOcurrencesNotReached(currentImage);

            if (timeRange && !isShowing && allowedToShow) {
                stateToReturn = showImage(imageName, newStateReceived);
            } else if (!timeRange && isShowing) {
                stateToReturn = hideImage(imageName, newStateReceived);
            }

            return stateToReturn;
        }

    const showImage = (imageName: string, newStateReceived: ImagesState): ImagesState => {
        const oldImageState: ImageInterface = imagesState[imageName];
        const newImageState = {
            ...oldImageState,
            showImage: true,
            timesShowed: oldImageState.timesShowed + 1
        }
        return getNewState(imageName, newImageState, newStateReceived);
    }

    const hideImage = (imageName: string, newStateReceived: ImagesState): ImagesState => {
        const oldImageState: ImageInterface = imagesState[imageName];
        const newImageState = {
            ...oldImageState,
            showImage: false,
        }
        return getNewState(imageName, newImageState, newStateReceived);
    }

    const getNewState = (imageName:string, newImageState: ImageInterface, newStateReceived: ImagesState): ImagesState => {
        const oldState = (newStateReceived && Object.keys(newStateReceived).length>0) ? newStateReceived : imagesState;
        const newStateToReturn: {[name: string]: ImageInterface} = {
            ...oldState,
            [imageName]: {...newImageState}
        }
        return newStateToReturn;
    }

    return (
        <MainComponent 
            imagesState={imagesState} 
            progressUpdate={progressUpdate}
            videoUri={videoUri}
            videoPlayerWidth={videoPlayerWidth}
        />
    )
}