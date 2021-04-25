import { timeFormat, format } from "d3";

const formatDate = timeFormat("%b %d, %Y");
const formatComma = format(",");

export const Tooltip = ({ activeRow, className }) => (
  <text className={className} x={-10} y={-10}>{`${
    activeRow.countryName
  }: ${formatComma(activeRow.deathTotal)} death${
    activeRow.deathTotal > 1 ? "s" : ""
  } as of ${formatDate(activeRow.date)}`}</text>
);
