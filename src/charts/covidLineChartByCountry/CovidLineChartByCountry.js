import { useData } from "./useData";
import { Linechart } from "./Linechart";

export const CovidLineChartByCountry = () => {
  const data = useData();

  return data ? <Linechart data={data} /> : <div>Loading...</div>;
};
