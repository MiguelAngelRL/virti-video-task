import React from 'react';
import {ImageInterface, imagesInitialState} from '../common';
import { MainComponent } from './main.component';
import {isImageInTimeRange, maxOcurrencesNotReached, isShowingNow} from './main.business'

interface Props {
}


export const MainContainer: React.FC<Props> = (props) => {
    const [imagesState, setImagesState] = React.useState(imagesInitialState);

    const progressUpdate = (currentTime: number) => {
        if(!currentTime) return;
        let newState: {[name: string]: ImageInterface}={} as {[name:string]: ImageInterface};
        newState = updateImageState(currentTime, "image1", newState);
        newState = updateImageState(currentTime, "image2", newState);
        newState = updateImageState(currentTime, "image3", newState);

        if (newState && Object.keys(newState).length>0) {
            setImagesState(newState);
        } 
    };

    const updateImageState = 
        (time : number, imageName : string, newState: {[name: string]:ImageInterface}) : {[name: string]:ImageInterface}=> {
            if(!time || !imageName) return newState;

            let stateToReturn = newState;
            
            const currentImage = imagesState[imageName];            
            const timeRange: boolean = isImageInTimeRange(time, currentImage);
            const isShowing: boolean = isShowingNow(currentImage);
            const allowedToShow: boolean = maxOcurrencesNotReached(currentImage);

            if (timeRange && !isShowing && allowedToShow) {
                stateToReturn = showImage(imageName);
            } else if (!timeRange && isShowing) {
                stateToReturn = hideImage(imageName);
            }
            
            return stateToReturn;
        }

    const showImage = (imageName: string): {[name:string]: ImageInterface} => {
        const oldImageState: ImageInterface = imagesState[imageName];
        const newImageState = {
            ...oldImageState,
            showImage: true,
            timesShowed: oldImageState.timesShowed + 1
        }
        return getNewState(imageName, newImageState);
    }

    const hideImage = (imageName: string): {[name:string]: ImageInterface} => {
        const oldImageState: ImageInterface = imagesState[imageName];
        const newImageState = {
            ...oldImageState,
            showImage: false,
        }
        return getNewState(imageName, newImageState);
    }

    const getNewState = (imageName:string, newImageState: ImageInterface): {[name:string]: ImageInterface} => {
        const newState: {[name: string]: ImageInterface} = {
            ...imagesState,
            [imageName]: {...newImageState}
        }
        return newState;
    }

    return (
        <MainComponent imagesState={imagesState} progressUpdate={progressUpdate}/>
    )
}