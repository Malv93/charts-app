import React from "react";
import { scaleLinear, scaleTime, extent, timeFormat } from "d3";
import styles from "./linechart.module.css";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 80, left: 100 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const xAxisLabelOffset = 60;
const xValue = (d) => d.timestamp;
const xAxisLabel = "Temperature";

const yAxisLabelOffset = 50;
const yValue = (d) => d.temperature;
const yAxisLabel = "Time";

const xAxisTickFormat = timeFormat("%a");

export const TempVSTimeLinechart = () => {
  const data = useData();

  if (!data) {
    return <div>Loading...</div>;
  }
  console.log(data);

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="chart-container">
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />
        <text
          className={styles.axisLabel}
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        <text
          className={styles.axisLabel}
          textAnchor="middle"
          innerwidth={innerWidth}
          transform={`translate(${-yAxisLabelOffset}, ${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {xAxisLabel}
        </text>
        <Marks
          data={data}
          yScale={yScale}
          xScale={xScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
          circleRadius={4}
        />
      </g>
    </svg>
  );
};
