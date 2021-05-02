import styles from "./tempVSTimeLinechart.module.css";

export const AxisBottom = ({
  xScale,
  innerHeight,
  tickFormat,
  tickOffset = 3,
}) => {
  return xScale.ticks().map((tickValue) => (
    <g
      className={styles.tick}
      key={tickValue}
      transform={`translate(${xScale(tickValue)}, 0)`}
    >
      <line y2={innerHeight} />
      <text className={styles.xLabel} y={innerHeight + tickOffset} dy=".71em">
        {tickFormat(tickValue)}
      </text>
    </g>
  ));
};
