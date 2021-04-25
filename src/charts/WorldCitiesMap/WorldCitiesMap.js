import React from "react";
import { useWorldAtlas } from "./useWorldAtlas";
import { useCities } from "./useCities";
import { Marks } from "./Marks";
import { scaleSqrt, max } from "d3";

const width = 960;
const height = 500;

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
      <Marks
        worldAtlas={worldAtlas}
        cities={cities}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </svg>
  );
};
