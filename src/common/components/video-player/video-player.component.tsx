import React from 'react';

interface Props {
  videoUri: string;
  videoPlayerWidth: string;
  progressUpdate: (time: number) => void;
}

export const VideoPlayerComponent: React.FC<Props> = (props) => {
  const videoPlayerRef = React.useRef();
  const {videoUri, videoPlayerWidth, progressUpdate} = props;

  const timeChecker = () => {
      const time: number = (videoPlayerRef && videoPlayerRef.current) ? 
                  (videoPlayerRef.current as HTMLVideoElement).currentTime * 1000 : 
                  undefined;
      if(time) {
        progressUpdate(time);
      }
    };

    return (
      <>
      <video
          id="videoplayer"
          controls
          autoPlay={false}
          loop={false}
          muted={false}
          disablePictureInPicture
          onTimeUpdate={timeChecker}
          ref={videoPlayerRef}
          width={videoPlayerWidth}
      >
          <source src={videoUri} type="video/mp4"/>
      </video>
      </>
    )
}