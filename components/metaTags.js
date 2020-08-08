import ReactHtmlParser from "react-html-parser";
import React from "react";

export default function MetaTags ({ general }) {
    const metaTags = {
        meta_keywords: {name: "keywords"},
        meta_descriptions: {name: "description"},
        meta_author: {name: "author"},
        meta_copyright: {name: "copyright"},
        og_title: {property: "og:title"},
        og_description: {property: "og:description"},
        og_type: {property: "og:type"},
        og_url: {property: "og:url"},
        twitter_site: {name: "twitter:site"},
        twitter_creator: {name: "twitter:creator"},
        twitter_title: {name: "twitter:title"},
        twitter_description: {name: "twitter:description"},
        twitter_card: {name: "twitter:card"}
    };

    return (
        <>
            {Object.keys(metaTags).filter(key => general[key]).map(key =>
                <meta {...metaTags[key]} content={general[key]} />
            )}
            {general.other_metategs && ReactHtmlParser(general.other_metategs)}
        </>
    )
}