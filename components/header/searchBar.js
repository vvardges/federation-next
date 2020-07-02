import React, {useEffect, useRef} from "react";
import {useRouter} from "next/router";

const SearchBar = ({ handleClose }) => {
    const router = useRouter();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            router.push({
                pathname: `/search`,
                query: {
                    q: event.target.value,
                    page: 1
                }
            });

            handleClose();
        }
    };

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div className="mx-auto mw-100">
            <div className="input-group input-group-sm border-bottom border-gray">
                <input type="text" className="form-control border-0 text-center font-family-condensed input-search" ref={inputRef} onKeyDown={handleKeyDown}/>
                <div className="input-group-append">
                    <button className="btn btn-link btn-sm p-0" onClick={handleClose}><i className="icon-close align-self-center"/></button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;