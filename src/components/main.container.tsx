import React from 'react';
import { ImageInterface, imagesInitialState,videoUri, videoPlayerWidth} from '../common';
import { MainComponent } from './main.component';
import { imagesStateCustomType, isImageInTimeRange, isShowingNow, maxOcurrencesNotReached } from './main.business';

interface Props {
}

export const MainContainer: React.FC<Props> = (props) => {
    const [imagesState, setImagesState] = React.useState<imagesStateCustomType>(imagesInitialState);

    const progressUpdate = (currentTime: number) => {
        if(!currentTime || !imagesState || !(Object.keys(imagesState).length>0)) return;
        
        let newStateToUpdate: imagesStateCustomType = {} as imagesStateCustomType;
        const imagesNames: string[] = Object.keys(imagesState);

        imagesNames.forEach((imageName: string) => {
            const currentImage = imagesState[imageName];                    
            if (isImageInTimeRange(currentTime, currentImage) && !(isShowingNow(currentImage)) && maxOcurrencesNotReached(currentImage)) {
                newStateToUpdate = showImage(imageName, newStateToUpdate);
            } else if (!(isImageInTimeRange(currentTime, currentImage)) && isShowingNow(currentImage)) {
                newStateToUpdate = hideImage(imageName, newStateToUpdate);
            }
        });

        if (newStateToUpdate && Object.keys(newStateToUpdate).length>0) {
            setImagesState(newStateToUpdate);
        } 
    };

    const showImage = (imageName: string, newStateToUpdate: imagesStateCustomType): imagesStateCustomType => {
        const currentImage: ImageInterface = imagesState[imageName];

        const newImageState: ImageInterface = {
            ...currentImage,
            showImage: true,
            timesShowed: currentImage.timesShowed + 1
        }
        return getNewState(imageName, newImageState, newStateToUpdate);
    }

    const hideImage = (imageName: string, newStateToUpdate: imagesStateCustomType): imagesStateCustomType => {
        const newImageState: ImageInterface = {
            ...imagesState[imageName],
            showImage: false,
        }
        return getNewState(imageName, newImageState, newStateToUpdate);
    }

    const getNewState = (imageName:string, newImageState: ImageInterface, newStateToUpdate: imagesStateCustomType): imagesStateCustomType => {
        const oldState: imagesStateCustomType = (newStateToUpdate && Object.keys(newStateToUpdate).length>0) ? newStateToUpdate : imagesState;        
        return {...oldState, [imageName]: {...newImageState}};
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