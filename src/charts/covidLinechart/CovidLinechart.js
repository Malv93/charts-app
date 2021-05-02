import styles from "./linechart.module.css";
import { useData } from "./useData";
import { scaleTime, extent, scaleLog, max, line } from "d3";
import { XMarkerLine, YMarkerLine } from "./MarkerLines";
import { XAxis, YAxis } from "./Axis";
const width = 960;
const height = 530;

const margin = { top: 50, right: 20, bottom: 80, left: 120 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const title = "Global Coronavirus Deaths Over Time";
const titleYOffset = -15;

const xValue = (d) => d.date;
const yValue = (d) => d.deathTotal;

// Marker lines values
const yMarkerValue = 1000000;
const xMarkerValue = new Date(2020, 8, 28);

export const CovidLinechart = () => {
  const data = useData();

  if (!data) {
    return "Loading...";
  }

  const xScale = scaleTime()
    .domain(extent(data, (d) => d.date))
    .range([0, innerWidth]);

  const yScale = scaleLog()
    .domain([0.1, max(data, (d) => d.deathTotal)])
    .range([innerHeight, 0]);

  // Generate the line of the path
  const lineGenerator = line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)));

  return (
    <svg className="chart-container" viewBox={`0 0 ${width} ${height}`}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <XAxis xScale={xScale} innerHeight={innerHeight} />
        <YAxis yScale={yScale} innerWidth={innerWidth} />
        <path className={styles.marks} d={lineGenerator(data)} />
        <YMarkerLine
          value={yMarkerValue}
          yScale={yScale}
          innerWidth={innerWidth}
        />
        <XMarkerLine
          date={xMarkerValue}
          xScale={xScale}
          innerHeight={innerHeight}
        />
        <text
          className={styles.title}
          x={innerWidth / 2}
          y={titleYOffset}
          textAnchor="middle"
        >
          {title}
        </text>
        <text
          className={styles.axisLabel}
          transform={`translate(-40, ${innerHeight / 2}) rotate(-90)`}
          textAnchor="middle"
        >
          Cumulative Deaths
        </text>
        <text
          className={styles.axisLabel}
          transform={`translate(${innerWidth / 2}, ${innerHeight + 40}) `}
          dominantBaseline="hanging"
          textAnchor="middle"
        >
          Time
        </text>
      </g>
    </svg>
  );
};
