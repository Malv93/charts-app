import React from "react";
import {
  scaleLinear,
  scaleTime,
  extent,
  timeFormat,
  bin,
  timeMonths,
  sum,
  max,
} from "d3";
import styles from "./migrantsHistogram.module.css";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

const width = 960;
const height = 530;
const margin = { top: 60, right: 30, bottom: 80, left: 120 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const title = "Migrants Deaths by Month";
const titleYOffset = -15;

const xAxisTickFormat = timeFormat("%Y");

export const MigrantsHistogram = () => {
  const data = useData();

  if (!data) {
    return <div>Loading...</div>;
  }

  const xAxisLabelOffset = 60;
  const xValue = (d) => d["Reported Date"];
  const xAxisLabel = "Time";

  const yAxisLabelOffset = 60;
  const yValue = (d) => d["Total Dead and Missing"];
  const yAxisLabel = "Total Dead and Missing";

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, stop] = xScale.domain();

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map((array) => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1,
    }));

  const yScale = scaleLinear()
    .domain([0, max(binnedData, (d) => d.y)])
    .range([innerHeight, 0])
    .nice();

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="chart-container">
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={7}
        />
        <text
          className={styles.axisLabel}
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
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
          {yAxisLabel}
        </text>
        <text
          className={styles.title}
          x={innerWidth / 2}
          y={titleYOffset}
          textAnchor="middle"
        >
          {title}
        </text>
        <Marks
          binnedData={binnedData}
          yScale={yScale}
          xScale={xScale}
          tooltipFormat={(d) => d}
          innerHeight={innerHeight}
        />
      </g>
    </svg>
  );
};
