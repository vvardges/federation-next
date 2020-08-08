import ReactHtmlParser from "react-html-parser";
import React from "react";

export default function MetaTags ({ general }) {
    const metaTags = {
        meta_keywords: "keywords",
        meta_descriptions: "description",
        meta_author: "author",
        meta_copyright: "copyright",
        og_title: "og:title",
        og_description: "og:description",
        og_type: "og:type",
        og_url: "og:url",
        twitter_site: "twitter:site",
        twitter_creator: "twitter:creator",
        twitter_title: "twitter:title",
        twitter_description: "twitter:description",
        twitter_card: "twitter:description"
    };

    return (
        <>
            {Object.keys(metaTags).filter(key => general[key]).map(key =>
                <meta name={metaTags[key]} content={general[key]} />
            )}
            {general.other_metategs && ReactHtmlParser(general.other_metategs)}
        </>
    )
}