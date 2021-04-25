import { json } from "d3";
import { useState, useEffect } from "react";
import { feature, mesh } from "topojson-client";

const jsonUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

export const useData = () => {
  const [data, setData] = useState(null);

  console.log(data);

  console.log(feature);
  useEffect(() => {
    json(jsonUrl).then((topology) => {
      const { countries, land } = topology.objects;
      setData({
        land: feature(topology, land),
        interiors: mesh(topology, countries, (a, b) => a !== b),
      });
    });
  }, []);

  return data;
};
