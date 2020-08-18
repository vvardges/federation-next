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
    text: {stroke: 'none', fill: '#757575', fontSize:14}
};

const colors = ['#4F91CF', '#99C1E5', '#FFA24B', '#3DB45E', '#F56A4C', '#A6CF4F', '#D48FEC'];
const padding = 9*2;

function ChartGenerator({chartType, data}) {
    switch (chartType) {
        case "VerticalBar":
            return (
                <XYPlot xType="ordinal" width={600-padding} height={360}>
                    <XAxis style={axisStyle}/>
                    <YAxis style={axisStyle}/>
                    <VerticalBarSeries data={data} color="#4F91CF"/>
                </XYPlot>
            );
        case "HorizontalBar":
            return (
                <div>
                    <DiscreteColorLegend
                        width={600}
                        items={data.map((d,i) => {return {title: d.label, color: colors[i], strokeStyle: 'solid',strokeWidth: 20 }})}
                        className="d-flex flex-row flex-wrap justify-content-center my-3 mx-auto"
                    />
                    <XYPlot width={820} height={360} stackBy="x" yType="ordinal" margin={{left: 100}}>
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
                <div className="d-flex flex-nowrap">
                    <RadialChart
                        colorType="literal"
                        width={400 - padding}
                        height={300}
                        data={data.map((d, i) => {
                            return {
                                angle: +d.angle,
                                color: colors[i]
                            }
                        })}
                    />
                    <DiscreteColorLegend width={200} items={data.map((d,i) => {return {title: d.label, color: colors[i], strokeWidth: 20}})} />
                </div>
            );
        case "Line":
            return (
                <XYPlot width={600 - padding} height={500} xType="ordinal">
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