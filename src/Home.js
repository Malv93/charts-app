import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

//uuidv4()

export const Home = ({ chartsInfo }) => {
  return (
    <div className="charts-list">
      {chartsInfo.map((chart) => (
        <Link to={chart.link}>
          <div id={uuidv4()} className="chart-card">
            <h2 className="chart-title">{chart.title}</h2>
            <p className="chart-description">{chart.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
