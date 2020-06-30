import React, {useEffect, useState} from "react";

import Carousel from '@brainhubeu/react-carousel';

function useWindowSize() {
    const isClient = typeof window === 'object';

    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined
        };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return false;
        }

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
}

export default function Gallery ({ data }) {

    const [isFullScreen, setFullScreen] = useState(false);
    const toggle = () => setFullScreen(!isFullScreen);

    const size = useWindowSize();
    const isXL = size.width >= 1200;

    return (
        <div>
            {isFullScreen || !isXL ?
                <Carousel
                    centered
                    infinite
                    arrows
                    slidesPerPage={2}
                >
                    {data.images.map(image =>
                        <img src={image} onClick={toggle} key={image}/>
                    )}
                </Carousel>
                :
                <div className="position-absolute" onClick={toggle}>
                    <img src={data.mainThumbnail} alt="" width={250}/>
                </div>
            }
        </div>
    );
}