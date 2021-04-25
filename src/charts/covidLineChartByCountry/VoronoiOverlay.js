import { Delaunay } from "d3-delaunay";
import { useMemo } from "react";
import styles from "./linechart.module.css";

export const VoronoiOverlay = ({
  innerWidth,
  innerHeight,
  allData,
  xValue,
  xScale,
  yValue,
  yScale,
  onHover,
  margin,
}) => {
  return useMemo(() => {
    console.log("memoizing");

    const points = allData.map((d) => [
      xScale(xValue(d)),
      yScale(1 + yValue(d)),
    ]);

    const delaunay = Delaunay.from(points);
    const voronoi = delaunay.voronoi([
      0,
      0,
      innerWidth + margin.right,
      innerHeight,
    ]);

    return (
      <g className={styles.voronoi}>
        {points.map((point, i) => (
          <path
            key={i}
            d={voronoi.renderCell(i)}
            onMouseEnter={() => onHover(allData[i])}
          />
        ))}
      </g>
    );
  }, [
    allData,
    innerHeight,
    innerWidth,
    onHover,
    xScale,
    xValue,
    yScale,
    yValue,
    margin,
  ]);
};
