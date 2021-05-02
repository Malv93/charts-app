import { Header } from "./Header";
import { Footer } from "./Footer";
import { Switch, Route } from "react-router-dom";
import { chartsInfo } from "./utils/chartsInfo";
import { Home } from "./Home";
import { ChartPage } from "./ChartPage";

const App = () => {
  return (
    <div className="App">
      <Header chartsInfo={chartsInfo} />
      <main>
        <Switch>
          {/* Try dynamic routing plus additional switch for components */}
          <Route path="/charts/:id">
            <ChartPage chartsInfo={chartsInfo} />
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
