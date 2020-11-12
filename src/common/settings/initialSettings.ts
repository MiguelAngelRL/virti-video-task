import {ImageInterface} from '../interfaces';

export const imagesInitialState: {[image:string]:ImageInterface} = {
    image1: {
        showImage: false,
        maxOcurrences: 1,
        timeToShow: 3500,
        timeOffset: 5000,
        timesShowed: 0,
        uri: '/images/image1.png'
    },
    image2: {
        showImage: false,
        maxOcurrences: 2,
        timeToShow: 6000,
        timeOffset: 2000,
        timesShowed: 0,
        uri: '/images/image2.png'
    },
    image3: {
        showImage: false,
        maxOcurrences: 3,
        timeToShow: 7000,
        timeOffset: 1500,
        timesShowed: 0,
        uri: '/images/image3.png'
    }
}

export const videoUri = '/Big_Buck_Bunny_1080_10s_5MB.mp4'

export const videoPlayerWidth = '1080';