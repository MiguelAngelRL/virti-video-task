import {ImageInterface} from '../common';

export const isShowingNow = (image: ImageInterface): boolean => {
  return image.showImage;
}

export const isImageInTimeRange = (currentTime: number, {timeToShow, timeOffset}: ImageInterface) => 
  isInTimeRange(currentTime, timeToShow, timeOffset)  ;

const isInTimeRange = (currentTime: number, timeToShow : number, timeOffset) : boolean => 
currentTime>=timeToShow && currentTime <= timeToShow + timeOffset;

export const maxOcurrencesNotReached = (image: ImageInterface): boolean => {
  const {maxOcurrences, timesShowed} = image;
  return maxOcurrences > timesShowed;
}
