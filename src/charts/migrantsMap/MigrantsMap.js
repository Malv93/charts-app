import React, { useState } from "react";
import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./useData";
import { Map } from "./bubbleMap/Map";
import { Histogram } from "./dateHistogram/Histogram";

const width = 960;
const height = 500;

const dateHistogramSize = 0.2;

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
      <Map data={data} filteredData={filteredData} worldAtlas={worldAtlas} />
      <g transform={`translate(0,${height * (1 - dateHistogramSize)})`}>
        <Histogram
          data={data}
          height={dateHistogramSize * height}
          width={width}
          setBrushExtent={setBrushExtent}
          xValue={xValue}
        />
      </g>
    </svg>
  );
};
