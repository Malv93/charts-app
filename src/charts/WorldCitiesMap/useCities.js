import { csv } from "d3";
import { useState, useEffect } from "react";

const csvUrl =
  "https://gist.githubusercontent.com/MarcoMalvic/b07c4c534464b244b2b15c0020a4521b/raw/102f36d71b0643822e17c276da60b63983db3c12/worldcities.csv";

const row = (d) => {
  d.lat = +d.lat;
  d.lng = +d.lng;

  return d;
};

export const useCities = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);

  return data;
};
