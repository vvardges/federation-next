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