import React from "react";
import { useWorldAtlas } from "./useWorldAtlas";
import { useCities } from "./useCities";
import { Marks } from "./Marks";
import { scaleSqrt, max } from "d3";
import styles from "./worldCitiesMap.module.css";

const width = 960;
const height = 530;

const margin = { top: 30, right: 0, left: 0, bottom: 0 };

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const title = "Cities World Map";
const yTitleOffset = 0;

export const WorldCitiesMap = () => {
  const worldAtlas = useWorldAtlas();
  const cities = useCities();

  if (!worldAtlas || !cities) {
    return <div>Loading...</div>;
  }

  const sizeValue = (d) => +d.population;
  const maxRadius = 10;
  const sizeScale = scaleSqrt()
    .domain([0, max(cities, sizeValue)])
    .range([0, maxRadius]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="chart-container">
      <g
        transform={`translate(${margin.left}, ${margin.top})`}
        width={innerWidth}
        height={innerHeight}
      >
        <Marks
          worldAtlas={worldAtlas}
          cities={cities}
          sizeScale={sizeScale}
          sizeValue={sizeValue}
        />
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
