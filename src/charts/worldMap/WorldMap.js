import React from "react";
import { useData } from "./useData";
import { Marks } from "./Marks";

const width = 960;
const height = 500;

export const WorldMap = () => {
  const data = useData();

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="chart-container">
      <Marks data={data} />
    </svg>
  );
};
