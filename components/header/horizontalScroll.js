import React, {useEffect, useRef, useState} from "react";

export default function HorizontalScroll ({ children, theme = "dark" }) {
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
        <div className={`col overflow-auto position-relative align-items-center d-flex horizontal-scroll-${theme}`}>
            {/*<div className={`collapse navbar-collapse ml-3 ${showSubheader ? "show" : ""}`}>*/}
            {isScrollable && scrollPosition > 0 &&
                <div className="position-absolute h-100 d-flex align-items-center" style={{top:0, left:0}}>
                    <button className="btn btn-gradient-left pr-5 border-0" onClick={handleLeftBtnClick}>
                        <i className="icon-chevron-right"/>
                    </button>
                </div>
            }
            <div className="overflow-auto scroll-invisible" ref={scrollableElement}>
                <div className="d-flex flex-row">
                    {children}
                </div>
                {/*<button className="btn btn-link text-white d-xl-none" onClick={toggleSubheader}><i className="icon-cheveron-down"/></button>*/}
            </div>
            {isScrollable && scrollPosition <= scrollWidth - offsetWidth &&
                <div className="position-absolute h-100 d-flex align-items-center" style={{top:0, right:0}}>
                    <button className="btn btn-gradient-right pl-5 border-0" onClick={handleRightBtnClick}>
                        <i className="icon-chevron-right"/>
                    </button>
                </div>
            }
        </div>
    )
}