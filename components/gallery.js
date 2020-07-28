import React, {useEffect, useState} from "react";
import Carousel from '@brainhubeu/react-carousel';

export default function Gallery ({ data }) {
    const [isFullScreen, setFullScreen] = useState(false);
    const toggle = () => setFullScreen(!isFullScreen);

    const [width, setWidth] = useState(0);
    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);

    if (!width) return null;

    let {images, mainThumbnail} = data;
    const isMulti = images.length > 1;

    const isXL = width >= 1200;

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
                            <div className="text-left" key={image.img}>
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