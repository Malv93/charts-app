import {
  scaleLinear,
  scaleTime,
  extent,
  timeFormat,
  bin,
  timeMonths,
  sum,
  max,
  brushX,
  select,
} from "d3";
import { useRef, useEffect, useMemo } from "react";
import styles from "../migrantsMap.module.css";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

const margin = { top: 0, right: 30, bottom: 20, left: 50 };

const xAxisTickFormat = timeFormat("%Y");

const yValue = (d) => d["Total Dead and Missing"];
const yAxisLabel = "Total Dead and Missing";

export const Histogram = ({ data, width, height, setBrushExtent, xValue }) => {
  const brushRef = useRef();

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xAxisLabelOffset = 20;

  const xAxisLabel = "Time";

  const yAxisLabelOffset = 30;

  const xScale = useMemo(
    () =>
      scaleTime().domain(extent(data, xValue)).range([0, innerWidth]).nice(),
    [data, xValue, innerWidth]
  );

  const binnedData = useMemo(() => {
    const [start, stop] = xScale.domain();
    return bin()
      .value(xValue)
      .domain(xScale.domain())
      .thresholds(timeMonths(start, stop))(data)
      .map((array) => ({
        y: sum(array, yValue),
        x0: array.x0,
        x1: array.x1,
      }));
  }, [data, xValue, xScale]);

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, max(binnedData, (d) => d.y)])
        .range([innerHeight, 0])
        .nice(),
    [binnedData, innerHeight]
  );

  useEffect(() => {
    const brush = brushX().extent([
      [0, 0],
      [innerWidth, innerHeight],
    ]);
    brush(select(brushRef.current));
    brush.on("brush end", (event) => {
      setBrushExtent(
        event.selection ? event.selection.map(xScale.invert) : null
      );
    });
  }, [innerWidth, innerHeight, setBrushExtent, xScale]);

  return (
    <>
      <rect className={styles.background} width={width} height={height} />
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
        <Marks
          binnedData={binnedData}
          yScale={yScale}
          xScale={xScale}
          tooltipFormat={(d) => d}
          innerHeight={innerHeight}
        />
        <g ref={brushRef} />
      </g>
    </>
  );
};
