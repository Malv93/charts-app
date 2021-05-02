import React from "react";
import { useData } from "./useData";
import { Marks } from "./Marks";
import styles from "./worldMap.module.css";

const width = 960;
const height = 530;

const margin = { top: 30, right: 0, left: 0, bottom: 0 };

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const title = "The World Map";
const yTitleOffset = 0;

export const WorldMap = () => {
  const data = useData();

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="chart-container">
      <g
        transform={`translate(${margin.left}, ${margin.top})`}
        width={innerWidth}
        height={innerHeight}
      >
        <Marks data={data} />
        <text
          x={width / 2}
          y={yTitleOffset}
          textAnchor="middle"
          className={styles.title}
        >
          {title}
        </text>
      </g>
    </svg>
  );
};
