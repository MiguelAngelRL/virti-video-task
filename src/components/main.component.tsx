import React from 'react';
import '../App.css';
import {videoUri, videoPlayerWidth} from '../common';

import {VideoPlayerComponent, ImageComponent, ImageInterface} from '../common'

interface Props {
  imagesState: {[image:string]: ImageInterface};
  progressUpdate: (time: number) => void;
}

export const MainComponent: React.FC<Props> = (props) => {
    const {imagesState, progressUpdate} = props;
    return (
      <div className="Video-container">
        <VideoPlayerComponent 
          progressUpdate={progressUpdate} 
          videoUri={videoUri}
          videoPlayerWidth={videoPlayerWidth}
        />
        <div style={{position:'absolute', alignSelf:'flex-start', top:0}}>
          <ImageComponent image={imagesState["image1"]}/>
        </div>
        <div style={{position:'absolute', alignSelf:'flex-end', top:0}}>
          <ImageComponent image={imagesState["image2"]}/>
        </div>
        <div style={{position:'absolute'}}>
          <ImageComponent image={imagesState["image3"]}/>
        </div>
      </div>
    )
}