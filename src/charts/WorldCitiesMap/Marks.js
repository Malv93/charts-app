import styles from "./worldCitiesMap.module.css";
import { geoPath, geoNaturalEarth1, geoGraticule } from "d3";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({
  worldAtlas: { land, interiors },
  cities,
  sizeScale,
  sizeValue,
}) => (
  <g className={styles.marks}>
    <path className={styles.sphere} d={path({ type: "Sphere" })} />
    <path className={styles.graticules} d={path(graticule())} />
    {land.features.map((feature, i) => (
      <path key={i} className={styles.land} d={path(feature)} />
    ))}
    <path className={styles.interiors} d={path(interiors)} />
    {cities.map((d, i) => {
      const [x, y] = projection([d.lng, d.lat]);
      return <circle key={i} cx={x} cy={y} r={sizeScale(sizeValue(d))} />;
    })}
  </g>
);
