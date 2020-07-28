import {
    DiscreteColorLegend,
    HorizontalBarSeries,
    HorizontalGridLines, LineMarkSeries,
    RadialChart,
    VerticalBarSeries,
    XAxis,
    XYPlot,
    YAxis
} from "react-vis";
import React from "react";

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
                <XYPlot xType="ordinal" width={570} height={360}>
                    <XAxis style={axisStyle}/>
                    <YAxis style={axisStyle}/>
                    <VerticalBarSeries data={data} color="#4F91CF"/>
                </XYPlot>
            );
        case "HorizontalBar":
            return (
                <div>
                    <DiscreteColorLegend items={data.map((d,i) => {return {title: d.label, color: colors[i], strokeStyle: 'solid',strokeWidth: 20}})} className="d-flex justify-content-between my-3"/>
                    <XYPlot width={660} height={360} stackBy="x" yType="ordinal" margin={{left: 100}}>
                        <YAxis style={axisStyle} tickSize={1}/>
                        {data.map((d, i) =>
                            <HorizontalBarSeries key={i} data={d.values.map(v => {return {x:+v.x, y:v.y}})} color={colors[i]}/>
                        )}
                        <XAxis style={axisStyle}/>
                    </XYPlot>
                </div>

            );
        case "Radial":
            return (
                <div className="d-flex">
                    <div className="col-auto">
                        <RadialChart
                            colorType="literal"
                            width={300}
                            height={300}
                            data={data.map((d, i) => {
                                return {
                                    angle: +d.angle,
                                    color: colors[i]
                                }
                            })}
                        />
                    </div>
                    <div className="col">
                        <DiscreteColorLegend items={data.map((d,i) => {return {title: d.label, color: colors[i], strokeWidth: 20}})} />
                    </div>
                </div>
            );
        case "Line":
            return (
                <XYPlot width={570} height={500} xType="ordinal">
                    <HorizontalGridLines />
                    <XAxis style={axisStyle}/>
                    <YAxis style={axisStyle}/>
                    <LineMarkSeries
                        data={data.map(d => {return {x: d.x, y: +d.y}})}
                        lineStyle={{fill:"none", stroke:"#CDE7FF", strokeWidth: 4}}
                        markStyle={{fill:"#4F91CF"}}
                    />
                </XYPlot>
            );
    }
}

export default ChartGenerator;