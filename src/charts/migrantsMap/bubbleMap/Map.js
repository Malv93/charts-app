import { Marks } from "./Marks";
import { scaleSqrt, max } from "d3";
import { useMemo } from "react";

const sizeValue = (d) => d["Total Dead and Missing"];

export const Map = ({ data, filteredData, worldAtlas }) => {
  const maxRadius = 15;
  const sizeScale = useMemo(
    () =>
      scaleSqrt()
        .domain([0, max(data, sizeValue)])
        .range([0, maxRadius]),
    [data, maxRadius]
  );

  return (
    <Marks
      worldAtlas={worldAtlas}
      data={filteredData}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
    />
  );
};
