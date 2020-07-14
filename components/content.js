import React from "react";
import ReactHtmlParser from 'react-html-parser';

import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalBarSeries,
    HorizontalBarSeries,
    RadialChart, LineMarkSeries
} from 'react-vis';
import Gallery from "./gallery";
import Banner from "./banner";

const axisStyle = {
    line: {stroke: '#B6B6B6'},
    ticks: {stroke: '#B6B6B6'},
    text: {stroke: 'none', fill: '#757575'}
};

const colors = ['#4F91CF', '#99C1E5', '#FFA24B', '#3DB45E', '#F56A4C', '#A6CF4F', '#D48FEC'];

function ChartGenerator({chartType, data}) {
    switch (chartType) {
        case "VerticalBar":
            return (
                <XYPlot xType="ordinal" width={570} height={360} >
                    <XAxis style={axisStyle}/>
                    <YAxis style={axisStyle}/>
                    <VerticalBarSeries data={data} color="#4F91CF"/>
                </XYPlot>
            );
        case "HorizontalBar":
            return (
                <XYPlot width={660} height={360} stackBy="x" yType="ordinal" margin={{left: 100}}>
                    <YAxis style={axisStyle} tickSize={1}/>
                    {data.map((d, i) =>
                        <HorizontalBarSeries key={i} data={d.values.map(v => {return {x:+v.x, y:v.y}})} color={colors[i]}/>
                    )}
                </XYPlot>
            );
        case "Radial":
            return (
                <RadialChart
                    colorType="literal"
                    width={300}
                    height={300}
                    data={data.map((d, i) => {
                        return {
                            angle: +d.label,
                            color: colors[i]
                        }
                    })}
                />
            );
        case "Line":
            return (
                <XYPlot width={570} height={500} xType="ordinal" yType="ordinal">
                    <HorizontalGridLines />
                    <XAxis style={axisStyle}/>
                    <YAxis style={axisStyle}/>
                    <LineMarkSeries
                        data={data}
                        lineStyle={{fill:"none", stroke:"#CDE7FF", strokeWidth: 4}}
                        markStyle={{fill:"#4F91CF"}}
                    />
                </XYPlot>
            );
    }
}

function ContentGenerator({ data }) {
    const {type, value, author} = data;
    switch (type) {
        case "heading":
            return (<h4>{value}</h4> );
        case "paragraph":
            return (<p>{ReactHtmlParser(value)}</p>);
        case "quote":
            return (
                <div className="bg-secondary p-3 pl-5">
                    <p className="font-italic">{value}</p>
                    <p className="text-right mb-0">{author}</p>
                </div>
            );
        case "lead":
            return (
                <p className="bg-secondary p-3 border-left border-md">{value}</p>
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
            return <div>asd</div>;
        default:
            return null;
    }
}

export default function Content({ content }) {
    if (!content) return;

    return (
        <div className="content">
            {content.map((data, index) =>
                <div className={`${data.type} my-3`} key={index}>
                    <ContentGenerator data={data}/>
                </div>
            )}
        </div>
    )
}