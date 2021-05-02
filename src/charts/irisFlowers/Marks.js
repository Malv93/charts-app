import styles from "./irisFlowerScatterplot.module.css";

export const Marks = ({
  data,
  xValue,
  xScale,
  yValue,
  yScale,
  colorValue,
  colorScale,
  circleRadius,
}) => {
  return data.map((d, i) => (
    <circle
      className={styles.mark}
      key={i}
      fill={colorScale(colorValue(d))}
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={circleRadius}
    >
      <title>{xValue(d)}</title>
    </circle>
  ));
};
