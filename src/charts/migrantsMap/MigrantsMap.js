import React, { useState } from "react";
import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./useData";
import { Map } from "./bubbleMap/Map";
import { Histogram } from "./dateHistogram/Histogram";
import styles from "./migrantsMap.module.css";

const width = 960;
const height = 530;

// histogram height relative to the CHart height
const dateHistogramSize = 0.2;

const margin = { top: 20, right: 0, left: 0, bottom: 0 };

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const title = "Missing Migrants in the World";
const yTitleOffset = 10;

export const MigrantsMap = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData();
  const [brushExtent, setBrushExtent] = useState();

  const xValue = (d) => d["Reported Date"];

  if (!worldAtlas || !data) {
    return <div>Loading...</div>;
  }

  const filteredData = brushExtent
    ? data.filter((d) => {
        const date = xValue(d);
        return date > brushExtent[0] && date < brushExtent[1];
      })
    : data;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="chart-container">
      <g
        width={innerWidth}
        height={innerHeight}
        transform={`translate(${margin.left}, ${margin.top})`}
      >
        <Map data={data} filteredData={filteredData} worldAtlas={worldAtlas} />
        <g transform={`translate(0,${innerHeight * (1 - dateHistogramSize)})`}>
          <Histogram
            data={data}
            height={dateHistogramSize * innerHeight}
            width={innerWidth}
            setBrushExtent={setBrushExtent}
            xValue={xValue}
          />
        </g>
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
