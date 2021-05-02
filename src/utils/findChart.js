import { PopulationBarchart } from "../charts/countriesPopulation/PopulationBarchart";
import { TempVSTimeLinechart } from "../charts/tempVSTime/TempVSTimeLinechart";
import { IrisFlowersScatterplot } from "../charts/irisFlowers/IrisFlowersScatterplot";
import { WorldMap } from "../charts/worldMap/WorldMap";
import { WorldCitiesMap } from "../charts/WorldCitiesMap/WorldCitiesMap";
import { MigrantsHistogram } from "../charts/migrantsHistogram/MigrantsHistogram";
import { MigrantsMap } from "../charts/migrantsMap/MigrantsMap";
import { AIDSMap } from "../charts/AIDSChoropletMap/AIDSMap";
import { CovidLinechart } from "../charts/covidLinechart/CovidLinechart";
import { CovidLineChartByCountry } from "../charts/covidLineChartByCountry/CovidLineChartByCountry";

export const findChart = (link) => {
  switch (link) {
    case "aids-choroplet-map":
      return <AIDSMap />;
    case "covid-country-linechart":
      return <CovidLineChartByCountry />;
    case "covid-linechart":
      return <CovidLinechart />;
    case "iris-flowers-scatterplot":
      return <IrisFlowersScatterplot />;
    case "migrants-histogram":
      return <MigrantsHistogram />;
    case "migrants-map":
      return <MigrantsMap />;
    case "population-barchart":
      return <PopulationBarchart />;
    case "temp-vs-time-linechart":
      return <TempVSTimeLinechart />;
    case "world-cities-map":
      return <WorldCitiesMap />;
    case "world-map":
      return <WorldMap />;

    default:
      return <div>404: Not Found</div>;
  }
};
