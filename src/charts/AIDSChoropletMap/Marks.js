import { geoNaturalEarth1, geoPath, geoGraticule } from "d3";
import styles from "./AIDSMap.module.css";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

const missingDataColor = "gray";

export const Marks = ({
  worldAtlas: { countries, interiors },
  rowByNumericCode,
  colorScale,
  colorValue,
}) => (
  <g className={styles.marks}>
    <path className={styles.sphere} d={path({ type: "Sphere" })} />
    <path className={styles.graticules} d={path(graticule())} />
    {countries.features.map((feature) => {
      const d = rowByNumericCode.get(feature.id);
      return (
        <path
          stroke="#a3a3a3"
          fill={d ? colorScale(colorValue(d)) : missingDataColor}
          d={path(feature)}
        />
      );
    })}
  </g>
);
