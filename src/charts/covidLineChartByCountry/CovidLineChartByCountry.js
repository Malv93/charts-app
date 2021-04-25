import { useData } from "./useData";

import { LineChart } from "./LineChart";

export const CovidLineChartByCountry = () => {
  const data = useData();

  return data ? <LineChart data={data} /> : <div>Loading...</div>;
};
