import styles from "./linechart.module.css";

import { useRef, useEffect } from "react";
import { select, axisBottom, axisLeft } from "d3";

export const XAxis = ({ xScale, innerHeight }) => {
  const ref = useRef();
  useEffect(() => {
    const xAxisG = select(ref.current);
    const xAxis = axisBottom(xScale).tickSize(-innerHeight).tickPadding(10);
    xAxisG.call(xAxis);
  }, [innerHeight, xScale]);
  return (
    <g
      className={styles.axis}
      transform={`translate(0, ${innerHeight})`}
      ref={ref}
    ></g>
  );
};

export const YAxis = ({ yScale, innerWidth }) => {
  const ref = useRef();
  useEffect(() => {
    const yAxisG = select(ref.current);
    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10)
      .ticks(10, "~s");
    yAxisG.call(yAxis);
  }, [innerWidth, yScale]);
  return <g className={styles.axis} ref={ref}></g>;
};
