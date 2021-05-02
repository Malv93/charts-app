import styles from "./worldMap.module.css";
import { geoPath, geoNaturalEarth1, geoGraticule } from "d3";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({ data: { land, interiors } }) => (
  <g className={styles.marks}>
    <path className={styles.sphere} d={path({ type: "Sphere" })} />
    <path className={styles.graticules} d={path(graticule())} />
    {land.features.map((feature) => (
      <path className={styles.land} d={path(feature)} />
    ))}
    <path className={styles.interiors} d={path(interiors)} />
  </g>
);
