import React from "react";
import ReactHtmlParser from 'react-html-parser';

import Gallery from "./gallery";
import Banner from "./banner";
import ChartGenerator from "./ChartGenerator";

function ContentGenerator({ data }) {
    const {type, value, author} = data;
    switch (type) {
        case "heading":
            return (<h4>{ReactHtmlParser(value)}</h4> );
        case "paragraph":
            return (<p>{ReactHtmlParser(value)}</p>);
        case "quote":
            return (
                <div className="bg-secondary p-3 pl-5">
                    <p className="font-italic">{ReactHtmlParser(value)}</p>
                    <p className="text-right mb-0">{author}</p>
                </div>
            );
        case "lead":
            return (
                <p className="bg-secondary p-3 border-left border-md">{ReactHtmlParser(value)}</p>
            );
        case "gallery":
            return (
                <Gallery data={data}/>
            );
        case "table":
            const {columns, rows} = data.data;
            return (
                <div className="border-top bg-secondary border-md font-family-roboto">
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
            );
        case "youtube":
        case "vimeo":
            const {url} = data;
            const src = `${type === "youtube" ? "https://www.youtube.com/embed" : "https://player.vimeo.com/video"}${url.substring(url.lastIndexOf("/"))}`;
            return (
                <div className="mx-auto">
                    <iframe
                        src={src}
                        width="100%"
                        height="500"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            );
        case "chart":
            return (
                <div className="d-flex justify-content-center">
                    <div className="bg-secondary border-top border-md p-3 font-family-condensed">
                        <p className="letter-spacing-lg">{data.title}</p>
                        <ChartGenerator {...data}/>
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