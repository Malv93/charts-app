import styles from "./linechart.module.css";
import { format, timeFormat } from "d3";
export const YMarkerLine = ({ value, yScale, innerWidth }) => {
  // Define the horizontal and vertical lines lines
  const markerLineY = yScale(value);

  return (
    <>
      <line
        className={styles.markerline}
        x1={0}
        y1={markerLineY}
        x2={innerWidth}
        y2={markerLineY}
      />
      <text
        className={styles.markerLineText}
        dominantBaseline="middle"
        textAnchor="end"
        x={-3}
        y={markerLineY}
      >
        {format(",")(value)}
      </text>
    </>
  );
};

export const XMarkerLine = ({ date, xScale, innerHeight }) => {
  const markerLineX = xScale(date);

  const height = innerHeight + 20;

  return (
    <>
      <line
        className={styles.markerline}
        x1={markerLineX}
        y1={0}
        x2={markerLineX}
        y2={height}
      />
      <text
        className={styles.markerLineText}
        dominantBaseline="hanging"
        textAnchor="middle"
        x={markerLineX}
        y={height}
      >
        {timeFormat("%m/%d/%y")(date)}
      </text>
    </>
  );
};
