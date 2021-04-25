import styles from "./barchart.module.css";

export const AxisLeft = ({ yScale }) => {
  return yScale.domain().map((tickValue) => (
    <g className={styles.tick} key={tickValue}>
      <text
        className={styles.yLabel}
        x={-3}
        y={yScale(tickValue) + yScale.bandwidth() / 2}
        dy=".32em"
      >
        {tickValue}
      </text>
    </g>
  ));
};
