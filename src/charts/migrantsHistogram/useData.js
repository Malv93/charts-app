import { csv } from "d3";
import { useState, useEffect } from "react";

const csvUrl =
  "https://gist.githubusercontent.com/MarcoMalvic/30fa1f24c6742bf42a433124d6fb99ba/raw/910068a08885e155e8b3aeb1c97ae6d64a363691/MissingMigrants-Global-2021-04-25T17-22-47.csv";

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d["Total Dead and Missing"] = +d["Total Dead and Missing"];
      d["Reported Date"] = new Date(d["Reported Date"]);
      return d;
    };
    csv(csvUrl, row).then((data) => setData(data));
    console.log("effect called");
  }, []);

  return data;
};
