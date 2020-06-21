import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = event => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }

            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, []);
}

export default function({ toggle, title, children, footer }) {
    const ref = useRef();

    useOnClickOutside(ref, () => toggle(false));

    useEffect(() => {
        document.body.classList.add("modal-open");
        return () => {
            document.body.classList.remove("modal-open");
        }
    });


    return ReactDOM.createPortal(
        <>
            <div className="modal-backdrop fade show"/>
            <div className="modal fade show d-block">
                <div className="modal-dialog" ref={ref}>
                    <div className="modal-content">
                        <div className="modal-header text-center bg-black">
                            <button type="button" className="close" onClick={() => toggle(false)}>
                                <i className="icon-close d-none d-lg-block"/>
                                <i className="icon-arrow-left d-lg-none"/>
                            </button>
                            <small className="modal-title font-family-roboto letter-spacing-xl text-white-50 mx-auto">{title}</small>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer pt-0">
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.querySelector("body")
    );
}