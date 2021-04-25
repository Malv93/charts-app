import { csv } from "d3";
import { useState, useEffect } from "react";

const csvUrl =
  "https://gist.githubusercontent.com/MarcoMalvic/348b156e998ff8339afc3a521f06d24d/raw/7bae6ab64b4abc6e36857f5103b4511f01f6dcde/share-of-population-infected-with-hiv-ihme.csv";

const row = (d) => {
  d.aids = +d["Prevalence - HIV/AIDS - Sex: Both - Age: 15-49 years (Percent)"];
  return d;
};

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);

  return data;
};
