import React from 'react';
import { ImageInterface } from '../../interfaces';

interface Props {
    image: ImageInterface;
}

export const ImageComponent: React.FC<Props> = (props) => {
    const {image} = props;
    const {uri, showImage} = image;
    return (
        uri && showImage && <img src={uri} alt=""/>
    )
}