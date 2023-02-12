import React, { useEffect } from "react";
import { range } from "../../utils";
import Grid from "../Grid";

function Instruments({ step, allSeries, setAllSeries, IDs }) {
  const defaultNumberOfInstruments = 4;
  const [numberOfInstruments, setnumberOfInstruments] = React.useState(defaultNumberOfInstruments);

  useEffect(() => {
    let obj = {};
    range(numberOfInstruments).forEach(element => {
    obj[`instrument-${element}`] = []
  })
  setAllSeries(obj)

  }, [numberOfInstruments]);


  return (
    <>
      {range(numberOfInstruments).map((val, i) => (
        
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
