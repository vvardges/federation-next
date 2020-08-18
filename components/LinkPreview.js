import React, {useEffect, useState} from "react";

import {getLinkPreview} from 'link-preview-js';

export default function LinkPreview ({ url }) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        getLinkPreview(url).then((data) => {
            setIsLoading(false);
            setData(data);
        });
    }, []);

    if (isLoading) return null;

    return (
        <a className="card mb-3 mx-auto border border-secondary" style={{maxWidth: 630}} href={url} target="_blank">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={data?.favicons[0]} className="card-img" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body text-left">
                        <h5 className="card-title">{data?.title}</h5>
                        <p className="card-text">{data?.description}</p>
                    </div>
                </div>
            </div>
        </a>

    )
};