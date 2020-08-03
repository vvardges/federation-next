import React from "react";
import {ReactTinyLink} from "react-tiny-link";

export default function LinkPreview ({ url }) {
    return (
        <ReactTinyLink
            cardSize="small"
            showGraphic={true}
            maxLine={2}
            minLine={1}
            url={url}
        />
    )
};