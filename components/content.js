import React from "react";
import ReactHtmlParser from 'react-html-parser';

import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    HorizontalBarSeries,
    RadialChart, ChartLabel, LineMarkSeries
} from 'react-vis';
import Gallery from "./gallery";

const axisStyle = {
    line: {stroke: '#B6B6B6'},
    ticks: {stroke: '#B6B6B6'},
    text: {stroke: 'none', fill: '#757575'}
};

const colors = ['#4F91CF', '#99C1E5', '#FFA24B', '#3DB45E', '#F56A4C', '#A6CF4F', '#D48FEC'];

function ChartGenerator() {
    return (
        <div className="font-family-condensed">
            <XYPlot xType="ordinal" width={570} height={360} >
                <XAxis style={axisStyle}/>
                <YAxis style={axisStyle}/>
                <VerticalBarSeries data={[{x: 2016, y: 1}, {x: 2017, y: 2}, {x: 2018, y: 12}, {x: 2019, y: 15}]} color="#4F91CF"/>
            </XYPlot>
            <XYPlot width={660} height={360} stackBy="x" yType="ordinal" margin={{left: 100}}>
                <YAxis style={axisStyle} tickSize={1}/>
                <HorizontalBarSeries data={[{y: 'Poland', x: 10}, {y: 'Bulgaria', x: 5}, {y: 'Romania', x: 15}, {y: 'Latvia', x: 10}, {y: 'Turkey', x: 5}, {y: 'Germany', x: 15}]} color={colors[0]}/>
                <HorizontalBarSeries data={[{y: 'Poland', x: 1}, {y: 'Bulgaria', x: 15}, {y: 'Romania', x: 22}, {y: 'Latvia', x: 2}, {y: 'Turkey', x: 3}, {y: 'Germany', x: 4}]} color={colors[1]}/>
            </XYPlot>
            <RadialChart
                width={300}
                height={300}
                data={[{angle: 45, color: colors[0]}, {angle: 45, color: colors[1]}, {angle: 5, color: colors[2]}, {angle: 10, color: colors[3]}]}
            />
            <XYPlot width={570} height={500}>
                <HorizontalGridLines />
                <XAxis style={axisStyle}/>
                <YAxis style={axisStyle}/>
                <LineMarkSeries
                    data={[{x: 1, y: 5.5}, {x: 2, y: 3}, {x: 3, y: 7}, {x: 3, y: 4}, {x: 5, y: 3}]}
                    lineStyle={{fill:"none", stroke:"#CDE7FF", strokeWidth: 4}}
                    markStyle={{fill:"#4F91CF"}}
                />
            </XYPlot>
        </div>
    )
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
        default:
            return (
                <div className="d-flex justify-content-center">
                    <div className="d-inline-flex bg-secondary">
                        <ChartGenerator/>
                    </div>
                </div>
            );
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