import styles from "./linechart.module.css";

export const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) => {
  return yScale.ticks().map((tickValue) => (
    <g
      key={tickValue}
      className={styles.tick}
      transform={`translate(0, ${yScale(tickValue)})`}
    >
      <line x2={innerWidth} />
      <text
        key={tickValue}
        className={styles.yLabel}
        dy=".32em"
        x={-tickOffset}
      >
        {tickValue}
      </text>
    </g>
  ));
};
