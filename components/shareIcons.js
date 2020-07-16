import React from "react";
import { useRouter } from "next/router";

const ShareIcons = ({ fullPath = "https://federation.dev.fg.appz.cloud" }) => {

    const router = useRouter();

    return (
        <div className="mb-1">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${fullPath}${router.asPath}`} className="badge rounded-circle bg-secondary text-black-50 py-1 mr-1" target="_blank">
                <i className="icon-facebook lead"/>
            </a>
            <a href={`http://twitter.com/intent/tweet?url=${fullPath}${router.asPath}${router.asPath}`} className="badge rounded-circle bg-secondary text-black-50 py-1 mr-1" target="_blank">
                <i className="icon-twitter lead"/>
            </a>
            <a href={`http://vk.com/share.php?url=${fullPath}${router.asPath}${router.asPath}`} className="badge rounded-circle bg-secondary text-black-50 py-1 mr-1" target="_blank">
                <i className="icon-vk lead"/>
            </a>
        </div>
    )
};

export default ShareIcons;