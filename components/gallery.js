import React, {useState} from "react";

import Carousel, { Dots } from '@brainhubeu/react-carousel';

export default function Gallery ({ data }) {

    const [isFullScreen, setFullScreen] = useState(false);
    const toggle = () => setFullScreen(!isFullScreen);

    return (
        <div>
            {isFullScreen ?
                <Carousel
                    centered
                    infinite
                    arrows
                    slidesPerPage={2}
                >
                    {data.images.map(image =>
                        <img src={image} />
                    )}
                </Carousel>
                :
                <div className="position-absolute" style={{left: -70}} onClick={toggle}>
                    <img src={data.mainThumbnail} alt=""/>
                </div>
            }
        </div>
    );
}