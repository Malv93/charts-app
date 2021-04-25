import { interpolateYlOrRd, scaleSequential, max } from "d3";
import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./useData";
import { useCodes } from "./useCodes";
import { Marks } from "./Marks";

const width = 960;
const height = 500;

const selectedYear = "2017";

export const AIDSMap = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData();
  const codes = useCodes();

  if (!worldAtlas || !data || !codes) {
    return <pre>Loading...</pre>;
  }

  console.log(codes);

  const filteredData = data.filter((d) => d.Year === selectedYear);

  // Maps from aplha codes to numeric codes
  const numericCodeByAlphaCode = new Map();
  codes.forEach((code) => {
    const alpha3Code = code["alpha-3"];
    const numericCode = code["country-code"];
    numericCodeByAlphaCode.set(alpha3Code, numericCode);
  });

  // Maps from numeric code to countries
  // passing through alpha3Codes
  const rowByNumericCode = new Map();

  filteredData.forEach((d) => {
    const alpha3Code = d.Code;
    const numericCode = numericCodeByAlphaCode.get(alpha3Code);
    rowByNumericCode.set(numericCode, d);
  });

  const colorValue = (d) => d.aids;

  const colorScale = scaleSequential(interpolateYlOrRd).domain([
    0,
    max(data, colorValue),
  ]);

  return (
    <svg className="chart-container" viewBox={`0 0 ${width} ${height}`}>
      <Marks
        worldAtlas={worldAtlas}
        rowByNumericCode={rowByNumericCode}
        colorScale={colorScale}
        colorValue={colorValue}
      />
    </svg>
  );
};
