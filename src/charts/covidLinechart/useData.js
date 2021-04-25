import { useState, useEffect } from "react";
import { csv, timeParse } from "d3";

//Stable commit, not updated
// const csvUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/f6cba355741233fec8b0b4786297f2b655fe177e/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"

//Updated last commit
const csvUrl =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

const parseDate = timeParse("%m/%d/%y");

const transform = (rawData) => {
  const days = rawData.columns.slice(4);
  const sum = (acc, value) => acc + value;

  return days.map((day) => {
    const deathTotal = rawData.map((d) => +d[day]).reduce(sum, 0);
    return {
      date: parseDate(day),
      deathTotal,
    };
  });
};

export const useData = () => {
  const [data, setData] = useState(null);
  console.log(data);

  useEffect(() => {
    csv(csvUrl).then((rawData) => setData(transform(rawData)));
  }, []);
  return data;
};
