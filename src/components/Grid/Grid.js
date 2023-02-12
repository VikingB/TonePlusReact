import React, { useEffect } from "react";
import { range } from "../../utils";
import GridButton from "../GridButton";
import Slider from "../Slider";
import debounce from "lodash.debounce";
var seriesBluePrint = [
  { pressed: false, note: "C4", key: Math.random() },
  { pressed: false, note: "C4", key: Math.random() },
  { pressed: false, note: "C4", key: Math.random() },
  { pressed: false, note: "C4", key: Math.random() },
  { pressed: false, note: "C4", key: Math.random() },
  { pressed: false, note: "C4", key: Math.random() },
  { pressed: false, note: "C4", key: Math.random() },
  { pressed: false, note: "C4", key: Math.random() },
  { pressed: false, note: "C4", key: Math.random() },
  { pressed: false, note: "C4", key: Math.random() },
  { pressed: false, note: "C4", key: Math.random() },
  { pressed: false, note: "C4", key: Math.random() },
  { pressed: false, note: "C4", key: Math.random() },
  { pressed: false, note: "C4", key: Math.random() },
  { pressed: false, note: "C4", key: Math.random() },
  { pressed: false, note: "C4", key: Math.random() },
];
function getBlueprint() {
  let arr = [];
  for (let i = 0; i < 16; i++) {
    arr.push({ pressed: false, note: "C4", key: Math.random() });
  }
  return arr;
}

function Grid({ step, allSeries, setAllSeries, name }) {
  const [series, setSeries] = React.useState(getBlueprint());
  const [filter, setFilter] = React.useState(0);

  React.useEffect(() => {
    const newAllSeries = { ...allSeries };
    if (typeof newAllSeries[name] !== "undefined") {
      newAllSeries[name].series = series;
      newAllSeries[name].setting = {'filter': filter};
      setAllSeries(newAllSeries);
    }
  }, [series, filter]);

  return (
    <div className="">
      <hr />
      <div className="row">
        {series.map((val, i) => (
          <GridButton
            key={val.key}
            index={i}
            series={series}
            setSeries={setSeries}
          />
        ))}
        {/* <Slider
          label="Delay dry/wet"
          min={0}
          max={1}
          step={0.01}
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          
        /> */}
      </div>
    </div>
  );
}

export default Grid;
