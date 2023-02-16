import React, { useEffect } from "react";
import { range } from "../../utils";
import Grid from "../Grid";
function getBlueprint() {
  let arr = [];
  for (let i = 0; i < 16; i++) {
    if(i % 2) 
    arr.push({ pressed: false, note: "C4", key: Math.random() });
    else
    arr.push({ pressed: true, note: "C4", key: Math.random() });
  }
  return arr;
}
function Instruments({
  step,
  allSeries,
  setAllSeries,
  IDs,
  defaultNumberOfInstruments = 1,
  synths
}) {
  const [numberOfInstruments, setNumberOfInstruments] = React.useState(
    defaultNumberOfInstruments
  );

  useEffect(() => {
    let obj = {};
    range(synths.length).forEach((element) => {
      obj[`instrument-${element}`] = { series: getBlueprint() };
      obj[`instrument-${element}`].setting = {};
    });
    setAllSeries(obj);
  }, [synths]);

  return (
    <>
      {synths.map((val, i) => (
        <Grid
          key={IDs[i]}
          name={`instrument-${i}`}
          allSeries={allSeries}
          setAllSeries={setAllSeries}
        />
      ))}
    </>
  );
}

export default Instruments;

{
  /* <Grid step={step % 16} series={series} setSeries={setSeries} />
        <Grid step={step % 16} series={series2} setSeries={setSeries2} /> */
}
