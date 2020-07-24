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
    const size = useWindowSize();
    const isXL = size.width >= 1200;

    const [isFullScreen, setFullScreen] = useState(false);
    const toggle = () => setFullScreen(!isFullScreen);

    const {images, mainThumbnail} = data;
    const isMulti = images.length > 2;

    return (
        <div className="gallery">
            {!isFullScreen && isXL ?
                <div className="position-absolute">
                    <button className="btn btn-dark btn-resize rounded-circle" onClick={toggle}><i className="icon-fullscreen-open"/></button>
                    <img src={mainThumbnail.img} alt="" width={250}/>
                </div> :
                <div className="text-center">
                    {isXL && <button className="btn btn-dark btn-resize rounded-circle position-relative mx-auto" style={{right: -300}} onClick={toggle}><i className="icon-fullscreen-close"/></button>}
                    <Carousel
                        centered
                        infinite={isMulti}
                        draggable={!isXL}
                        slidesPerPage={2}
                        arrowLeft={isXL && isMulti ? <i className="icon-arrow-left cursor-pointer mr-2" /> : null}
                        arrowRight={isXL && isMulti ? <i className="icon-arrow-right cursor-pointer ml-2" /> : null}
                        addArrowClickHandler={isXL}
                    >
                        {images.map(image =>
                            <div className="text-left">
                                <img src={image.img} onClick={toggle} className="w-100" key={image}/>
                                <small className="text-muted font-family-condensed">{image.source}</small>
                            </div>
                        )}
                    </Carousel>
                </div>
            }
        </div>
    );
}