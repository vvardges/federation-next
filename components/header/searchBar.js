import React from "react";
import {useRouter} from "next/router";

const SearchBar = () => {
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
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <input type="text" className="form-control" onKeyDown={handleKeyDown}/>
        </div>
    );
};

export default SearchBar;