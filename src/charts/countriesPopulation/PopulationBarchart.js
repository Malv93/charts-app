import React from "react";
import { scaleBand, scaleLinear, max } from "d3";
import styles from "./populationBarchart.module.css";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { format } from "d3";

const width = 960;
const height = 530;
const margin = { top: 60, right: 20, bottom: 60, left: 250 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const xAxisLabelOffset = 50;

const title = "Population by Country";
const yTitleOffset = -20;

const xAxisTickFormat = (tickValue) =>
  format(".2s")(tickValue).replace("G", "B");

const tooltipFormat = (markValue) => format(".3s")(markValue).replace("G", "B");

export const PopulationBarchart = () => {
  const data = useData();

  if (!data) {
    return <div>Loading...</div>;
  }

  const yValue = (d) => d.Country;
  const xValue = (d) => d.Population;

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.1);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  console.log(xScale.ticks());

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="chart-container">
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} />
        <text
          className={styles.axisLabel}
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          2020 Population
        </text>
        <Marks
          data={data}
          yScale={yScale}
          xScale={xScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={tooltipFormat}
        />
        <text
          x={innerWidth / 2}
          y={yTitleOffset}
          textAnchor="middle"
          className={styles.title}
        >
          {title}
        </text>
      </g>
    </svg>
  );
};
