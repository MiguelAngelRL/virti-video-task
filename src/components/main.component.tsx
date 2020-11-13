import React from 'react';
import '../App.css';
import {VideoPlayerComponent, ImageComponent, ImageInterface} from '../common'

interface Props {
  imagesState: {[image:string]: ImageInterface};
  progressUpdate: (time: number) => void;
  videoUri:string
  videoPlayerWidth:string
}

export const MainComponent: React.FC<Props> = (props) => {
    const {imagesState, progressUpdate, videoUri, videoPlayerWidth} = props;
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