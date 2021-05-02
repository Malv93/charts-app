import React, { useState } from "react";
import { scaleLinear, extent, scaleOrdinal } from "d3";
import styles from "./irisFlowerScatterplot.module.css";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { ColorLegend } from "./ColorLegend";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const width = 960;
const height = 530;
const margin = { top: 20, right: 180, bottom: 80, left: 100 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const xAxisLabelOffset = 60;
const yAxisLabelOffset = 50;

const options = [
  { value: "sepal_length", label: "Sepal Length" },
  { value: "sepal_width", label: "Sepal Width" },
  { value: "petal_length", label: "Petal Length" },
  { value: "petal_width", label: "Petal Width" },
];

const getLabel = (attribute) => {
  const match = options.find((element) => element.value === attribute);
  return match.label;
};

export const IrisFlowersScatterplot = () => {
  const data = useData();
  const [hoveredValue, setHoveredValue] = useState(null);

  const xValue = (d) => d[xAttribute];
  const initialXAttribute = "sepal_width";
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xAxisLabel = getLabel(xAttribute);

  const yValue = (d) => d[yAttribute];
  const initialYAttribute = "sepal_length";
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yAxisLabel = getLabel(yAttribute);

  const colorValue = (d) => d.species;
  const colorLegendLabel = "Species";

  const circleRadius = 7;

  if (!data) {
    return <div>Loading...</div>;
  }

  const filteredData = data.filter((d) => hoveredValue === colorValue(d));
  const fadeOpacity = 0.3;

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#E6842A", "#137B80", "#8E6C8A"]);

  return (
    <div className="chart-container">
      <div className={styles.dropdownsBox}>
        <span className={styles.dropdownLabel}>X</span>
        <Dropdown
          className={styles.dropdown}
          options={options}
          onChange={({ value }) => setXAttribute(value)}
        />
        <span className={styles.dropdownLabel}>Y</span>
        <Dropdown
          className={styles.dropdown}
          options={options}
          onChange={({ value }) => setYAttribute(value)}
        />
      </div>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickOffset={5}
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
          <g transform={`translate(${innerWidth + 40}, 60)`}>
            <text
              className={styles.axisLabel}
              textAnchor="middle"
              x={45}
              y={-30}
            >
              {colorLegendLabel}
            </text>
            <ColorLegend
              colorScale={colorScale}
              tickSpacing={25}
              tickSize={circleRadius}
              tickTextOffset={20}
              onHover={setHoveredValue}
              hoveredValue={hoveredValue}
              fadeOpacity={fadeOpacity}
            />
          </g>
          <g opacity={hoveredValue ? fadeOpacity : 1}>
            <Marks
              data={data}
              xValue={xValue}
              xScale={xScale}
              yValue={yValue}
              yScale={yScale}
              colorValue={colorValue}
              colorScale={colorScale}
              circleRadius={circleRadius}
            />
          </g>
          <Marks
            data={filteredData}
            xValue={xValue}
            xScale={xScale}
            yValue={yValue}
            yScale={yScale}
            colorValue={colorValue}
            colorScale={colorScale}
            circleRadius={circleRadius}
          />
        </g>
      </svg>
    </div>
  );
};
