import { csv } from "d3";
import { useState, useEffect } from "react";

const csvUrl =
  "https://gist.githubusercontent.com/MarcoMalvic/30fa1f24c6742bf42a433124d6fb99ba/raw/910068a08885e155e8b3aeb1c97ae6d64a363691/MissingMigrants-Global-2021-04-25T17-22-47.csv";

const row = (d) => {
  d.coords = d["Location Coordinates"]
    .split(",")
    .map((d) => +d)
    .reverse();
  d["Total Dead and Missing"] = +d["Total Dead and Missing"];
  d["Reported Date"] = new Date(d["Reported Date"]);

  return d;
};

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);

  return data;
};
