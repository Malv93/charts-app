import { interpolateYlOrRd, scaleSequential, max } from "d3";
import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./useData";
import { useCodes } from "./useCodes";
import { Marks } from "./Marks";
import styles from "./AIDSMap.module.css";

const width = 960;
const height = 530;

const selectedYear = "2017";
const margin = { top: 30, right: 0, left: 0, bottom: 0 };

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const title = "HIV/AIDS Infected People";
const yTitleOffset = 0;

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
      <g
        transform={`translate(${margin.left}, ${margin.top})`}
        width={innerWidth}
        height={innerHeight}
      >
        <Marks
          worldAtlas={worldAtlas}
          rowByNumericCode={rowByNumericCode}
          colorScale={colorScale}
          colorValue={colorValue}
        />
        <text
          x={width / 2}
          y={yTitleOffset}
          textAnchor="middle"
          className={styles.title}
        >
          {title}
        </text>
      </g>
    </svg>
  );
};
