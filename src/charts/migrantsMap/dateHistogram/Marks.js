import styles from "../migrantsMap.module.css";

export const Marks = ({
  binnedData,
  yScale,
  xScale,
  tooltipFormat,
  innerHeight,
}) => (
  <g className={styles.marks}>
    {binnedData.map((d, i) => (
      <rect
        key={i}
        x={xScale(d.x0)}
        y={yScale(d.y)}
        width={xScale(d.x1) - xScale(d.x0)}
        height={innerHeight - yScale(d.y)}
      >
        <title>{tooltipFormat(d.y)}</title>
      </rect>
    ))}
  </g>
);
