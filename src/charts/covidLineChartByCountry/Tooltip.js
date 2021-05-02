import { timeFormat, format } from "d3";

const formatDate = timeFormat("%b %d, %Y");
const formatComma = format(",");

export const Tooltip = ({
  activeRow,
  className,
  lineGenerator,
  innerWidth,
  innerHeight,
}) => {
  // Place the tooltip towards the inner part of the chart
  const isWest = lineGenerator.x()(activeRow) > innerWidth / 2;
  const isNorth = lineGenerator.y()(activeRow) < innerHeight / 2;

  return (
    <text
      className={className}
      x={isWest ? -10 : 10}
      y={isNorth ? 20 : -10}
      textAnchor={isWest ? "end" : "start"}
    >{`${activeRow.countryName}: ${formatComma(activeRow.deathTotal)} death${
      activeRow.deathTotal > 1 ? "s" : ""
    } as of ${formatDate(activeRow.date)}`}</text>
  );
};
