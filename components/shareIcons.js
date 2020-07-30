import React from "react";

const ShareIcons = ({ fullPath }) => {
    return (
        <div>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${fullPath}`} className="badge rounded-circle bg-secondary text-black-50 py-1 mr-1" target="_blank">
                <i className="icon-facebook lead"/>
            </a>
            <a href={`http://twitter.com/intent/tweet?url=${fullPath}`} className="badge rounded-circle bg-secondary text-black-50 py-1 mr-1" target="_blank">
                <i className="icon-twitter lead"/>
            </a>
            <a href={`http://vk.com/share.php?url=${fullPath}`} className="badge rounded-circle bg-secondary text-black-50 py-1 mr-1" target="_blank">
                <i className="icon-vk lead"/>
            </a>
        </div>
    )
};

export default ShareIcons;