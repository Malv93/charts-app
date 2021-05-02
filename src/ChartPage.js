import { useParams } from "react-router-dom";
import { findChart } from "./utils/findChart";

export const ChartPage = ({ chartsInfo }) => {
  const { id } = useParams();

  const chartInfo = chartsInfo.find((info) => info.link === id);

  return (
    <>
      {findChart(id)}
      {chartInfo && (
        <div className="chart-info">
          <p>{chartInfo.description}</p>
          <p>
            Resource: <a href={chartInfo.resource}>{chartInfo.resource}</a>
          </p>
          <p>
            Data: <a href={chartInfo.data}>{chartInfo.data}</a>
          </p>
        </div>
      )}
    </>
  );
};
