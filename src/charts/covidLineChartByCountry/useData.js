import { useState, useEffect } from "react";
import { csv, timeParse } from "d3";

//Stable commit, not updated
// const csvUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/f6cba355741233fec8b0b4786297f2b655fe177e/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"

//Updated last commit
const csvUrl =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

const parseDate = timeParse("%m/%d/%y");

// TODO: group countries splitted in multiple Province/State

// TODO: show only a limited number of countries, ex. top 10

const transform = (rawData) => {
  // from columns extract only the days columns
  const days = rawData.columns.slice(4);

  // limit the number of days
  const limitedDays = days.slice(0, 100);

  // limit the number of the countries to first listed countries
  const limitedData = rawData.slice(0, 10);

  return limitedData.map((d) => {
    const countryName = d["Country/Region"];
    const countryTimeSeries = limitedDays.map((day) => ({
      date: parseDate(day),
      deathTotal: +d[day],
      countryName,
    }));
    countryTimeSeries.countryName = countryName;

    return countryTimeSeries;
  });
};

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl).then((rawData) => setData(transform(rawData)));
  }, []);
  return data;
};
