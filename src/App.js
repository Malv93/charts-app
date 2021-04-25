import { Header } from "./Header";
import { Footer } from "./Footer";
import { Switch, Route } from "react-router-dom";
import { chartsInfo } from "./charts/chartsInfo";
import { PopulationBarchart } from "./charts/countriesPopulation/PopulationBarchart";
import { TempVSTimeLinechart } from "./charts/tempVSTime/TempVSTimeLinechart";
import { IrisFlowersScatterplot } from "./charts/irisFlowers/IrisFlowersScatterplot";
import { WorldMap } from "./charts/worldMap/WorldMap";
import { WorldCitiesMap } from "./charts/WorldCitiesMap/WorldCitiesMap";
import { MigrantsHistogram } from "./charts/migrantsHistogram/MigrantsHistogram";
import { MigrantsMap } from "./charts/migrantsMap/MigrantsMap";
import { AIDSMap } from "./charts/AIDSChoropletMap/AIDSMap";
import { CovidLinechart } from "./charts/covidLinechart/CovidLinechart";
import { CovidLineChartByCountry } from "./charts/covidLineChartByCountry/CovidLineChartByCountry";
import { Home } from "./Home";

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          <Route path="/charts/population-barchart">
            <PopulationBarchart />
            <p>Prova</p>
          </Route>
          <Route path="/charts/temp-vs-time-linechart">
            <TempVSTimeLinechart />
          </Route>
          <Route path="/charts/iris-flowers-scatterplot">
            <IrisFlowersScatterplot />
          </Route>
          <Route path="/charts/world-map">
            <WorldMap />
          </Route>
          <Route path="/charts/world-cities-map">
            <WorldCitiesMap />
          </Route>
          <Route path="/charts/migrants-histogram">
            <MigrantsHistogram />
          </Route>
          <Route path="/charts/migrants-map">
            <MigrantsMap />
          </Route>
          <Route path="/charts/aids-choroplet-map">
            <AIDSMap />
          </Route>
          <Route path="/charts/covid-linechart">
            <CovidLinechart />
          </Route>
          <Route path="/charts/covid-country-linechart">
            <CovidLineChartByCountry />
          </Route>
          <Route path="/">
            <Home chartsInfo={chartsInfo} />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default App;
