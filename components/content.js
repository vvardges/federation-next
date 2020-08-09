import React from "react";
import ReactHtmlParser from 'react-html-parser';

import Gallery from "./gallery";
import Banner from "./banner";
import ChartGenerator from "./ChartGenerator";

import dynamic from "next/dynamic";
const LinkPreview = dynamic(
    () => import('./LinkPreview'),
    { ssr: false }
);


function ContentGenerator({ data }) {
    const {type, value, author} = data;
    switch (type) {
        case "heading":
            return (<h4 className="font-family-pt">{ReactHtmlParser(value)}</h4> );
        case "paragraph":
            return (<p>{ReactHtmlParser(value)}</p>);
        case "link":
            return (
                <div className="d-inline-block mx-auto">
                    <LinkPreview url={data.url}/>
                </div>
            );
        case "quote":
            return (
                <div className="bg-secondary p-3 pl-5">
                    <p className="font-italic">{ReactHtmlParser(value)}</p>
                    <p className="text-right mb-0">{author}</p>
                </div>
            );
        case "lead":
            return (
                <div className="row">
                    <p className="bg-secondary p-3 border-left border-md mx-md-2">{ReactHtmlParser(value)}</p>
                </div>
            );
        case "gallery":
            return (
                <Gallery data={data}/>
            );
        case "table":
            const {columns, rows} = data.data;
            return (
                <div className="border-top bg-secondary border-md font-family-roboto my-5">
                    <div className="table-responsive">
                        <table className="table table-borderless table-sm mb-0">
                            <thead>
                            <tr className="bg-white">
                                {columns.map((column, index) =>
                                    <th key={index}>{column}</th>
                                )}
                            </tr>
                            </thead>
                            <tbody>
                            {rows.map((row, index) =>
                                <tr key={index}>
                                    {row.map((r, index) =>
                                        <td key={index}>{r}</td>
                                    )}
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        case "youtube":
        case "vimeo":
            const {url} = data;
            const src = `${type === "youtube" ? "https://www.youtube.com/embed" : "https://player.vimeo.com/video"}${url.substring(url.lastIndexOf("/"))}`;
            return (
                <div className="video">
                    <iframe src={src} frameBorder="0"/>
                </div>
            );
        case "chart":
            return (
                <div className="d-flex justify-content-center">
                    <div className="bg-secondary border-top border-md p-3 font-family-condensed overflow-auto">
                        <p className="letter-spacing-lg">{data.title}</p>
                        <ChartGenerator {...data}/>
                        <small className="text-muted font-family-condensed font-italic">{data.source}</small>
                    </div>
                </div>
            );
        case "advertising":
            return <Banner banner={data}/>;
        default:
            return null;
    }
}

export default function Content({ content }) {
    if (!content) return;

    return (
        <div className="content pb-4">
            {content.map((data, index) =>
                <div className={`${data.type} my-3`} key={index}>
                    <ContentGenerator data={data}/>
                </div>
            )}
        </div>
    )
}