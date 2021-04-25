import { useCallback, useMemo, useState } from "react";
import { scaleTime, extent, scaleLog, max, line } from "d3";
import { XAxis, YAxis } from "./Axis";
import { VoronoiOverlay } from "./VoronoiOverlay";
import { Tooltip } from "./Tooltip";
import styles from "./linechart.module.css";

const width = 960;
const height = 500;

const margin = { top: 50, right: 20, bottom: 80, left: 120 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const xValue = (d) => d.date;
const yValue = (d) => d.deathTotal;

export const LineChart = ({ data }) => {
  const [activeRow, setActiveRow] = useState();

  const handleVoronoiHover = useCallback(setActiveRow, [setActiveRow]);

  const allData = useMemo(() => {
    return data.reduce(
      (accumulator, countryTimeseries) => accumulator.concat(countryTimeseries),
      []
    );
  }, [data]);

  const xScale = useMemo(() => {
    return scaleTime().domain(extent(allData, xValue)).range([0, innerWidth]);
  }, [allData]);
  const yScale = useMemo(() => {
    return scaleLog()
      .domain([1, max(allData, yValue)])
      .range([innerHeight, 0]);
  }, [allData]);

  // Generate the line of the paths
  const lineGenerator = useMemo(() => {
    return line()
      .x((d) => xScale(xValue(d)))
      .y((d) => yScale(1 + yValue(d)));
  }, [xScale, yScale]);

  return (
    <svg className="chart-container" viewBox={`0 0 ${width} ${height}`}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <XAxis xScale={xScale} innerHeight={innerHeight} />
        <YAxis yScale={yScale} innerWidth={innerWidth} />
        {data.map((countryTimeseries, i) => {
          return (
            <path
              key={i}
              className={styles.marks}
              d={lineGenerator(countryTimeseries)}
            />
          );
        })}
        {activeRow && (
          <g className={styles.activeMark}>
            <path
              d={lineGenerator(
                data.find(
                  (countryTimeseries) =>
                    countryTimeseries.countryName === activeRow.countryName
                )
              )}
            />
            <g
              transform={`translate(${lineGenerator.x()(
                activeRow
              )}, ${lineGenerator.y()(activeRow)})`}
            >
              <circle r="5" />
              <Tooltip activeRow={activeRow} className={styles.tooltipStroke} />
              <Tooltip activeRow={activeRow} className={styles.tooltip} />
            </g>
          </g>
        )}

        <text
          className={styles.mainTitle}
          x={innerWidth / 2}
          y={-15}
          textAnchor="middle"
        >
          Global Coronavirus Deaths Over Time By Country
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
        <VoronoiOverlay
          onHover={handleVoronoiHover}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          allData={allData}
          xScale={xScale}
          xValue={xValue}
          yScale={yScale}
          yValue={yValue}
          margin={margin}
        />
      </g>
    </svg>
  );
};
