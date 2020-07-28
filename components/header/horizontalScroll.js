import React, {useEffect, useRef, useState} from "react";

export default function HorizontalScroll ({ children }) {
    // const [showSubheader, setShowSubheader] = useState(false);
    // const toggleSubheader = () => setShowSubheader(!showSubheader);

    const [isScrollable, setIsScrollable] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [offsetWidth, setOffsetWidth] = useState(0);
    const [scrollWidth, setScrollWidth] = useState(0);

    const scrollableElement = useRef(null);

    useEffect(() => {
        const scrollWidth = scrollableElement.current.scrollWidth;
        const offsetWidth = scrollableElement.current.offsetWidth;

        setIsScrollable(offsetWidth < scrollWidth);
        setScrollWidth(scrollWidth);
        setOffsetWidth(offsetWidth);
    });


    const handleLeftBtnClick = () => {
        updateScrollPosition(-offsetWidth);
    };

    const handleRightBtnClick = () => {
        updateScrollPosition(offsetWidth);
    };

    const updateScrollPosition = (delta) => {
        const newPosition = scrollPosition + delta;
        setScrollPosition(newPosition);
        scrollableElement.current.scrollTo(newPosition, 0);
    };

    return (
        <div className="col overflow-auto position-relative align-items-center d-flex">
            {/*<div className={`collapse navbar-collapse ml-3 ${showSubheader ? "show" : ""}`}>*/}
            {isScrollable && scrollPosition > 0 && <div className="position-absolute" style={{top:5, left:0}}>
                <button className="btn btn-lg btn-link text-white" onClick={handleLeftBtnClick}>
                    <i className="icon-chevron-right"/>
                </button>
            </div>}
            <div className="overflow-auto scroll-invisible" ref={scrollableElement}>
                <div>
                    {children}
                </div>
                {/*<button className="btn btn-link text-white d-xl-none" onClick={toggleSubheader}><i className="icon-cheveron-down"/></button>*/}
            </div>
            {isScrollable && scrollPosition <= scrollWidth - offsetWidth && <div className="position-absolute" style={{top:5, right:0}}>
                <button className="btn btn-lg btn-link text-white" onClick={handleRightBtnClick}>
                    <i className="icon-chevron-right"/>
                </button>
            </div>}
        </div>
    )
}