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
    RadialChart, ChartLabel, LineSeries
} from 'react-vis';
import Gallery from "./gallery";

const data = [{x: '2016', y: 10}, {x: '2017', y: 5}, {x: '2018', y: 15}];

function ChartGenerator() {
    return (
        <div>
            <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <VerticalBarSeries data={data} />
            </XYPlot>
            <XYPlot width={300} height={300} stackBy="x">
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <HorizontalBarSeries data={[{y: 2, x: 10}, {y: 4, x: 5}, {y: 5, x: 15}]} />
                <HorizontalBarSeries data={[{y: 2, x: 12}, {y: 4, x: 2}, {y: 5, x: 11}]} />
            </XYPlot>
            <RadialChart width={300} height={300} data={[{angle: 45}, {angle: 55}]}/>
            <XYPlot width={300} height={300}>
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis />
                <YAxis />
                <LineSeries
                    className="first-series"
                    data={[{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 12}, {x: 4, y: 15}]}
                />
            </XYPlot>
        </div>
    )
}

function ContentGenerator({ data }) {
    const {type, value, author} = data;
    switch (type) {
        case "heading":
            return (
                <div className="pl-xl-6">
                    <h4 className="my-3">{value}</h4>
                </div>
            );
        case "paragraph":
            return (
                <div className="pl-xl-7">
                    <p className="my-3 pl-lg-5">{ReactHtmlParser(value)}</p>
                </div>
            );
        case "quote":
            return (
                <div className="pl-xl-6 my-3">
                    <div className="bg-secondary p-3 pl-5">
                        <p className="font-italic">{value}</p>
                        <p className="text-right mb-0">{author}</p>
                    </div>
                </div>
            );
        case "lead":
            return (
                <div className="pl-xl-6 my-3">
                    <p className="bg-secondary p-3 border-left border-md">{value}</p>
                </div>
            );
        case "gallery":
            return (
                <Gallery data={data}/>
            );
        case "table":
            const {columns, rows} = data.data;
            return (
                <div className="my-3 border-top bg-secondary border-md font-family-roboto">
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

    return content.map((data, index) =>
        <ContentGenerator data={data} key={index}/>
    )
}