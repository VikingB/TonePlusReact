import React from "react";
import { range } from "../../utils";
import GridButton from "../GridButton";
import Slider from "../Slider";
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
  const [filter, setFilter] = React.useState(50);

  React.useEffect(() => {
  
    const newAllSeries = { ...allSeries };
  
    if(typeof newAllSeries[name] !== 'undefined') {

      newAllSeries[name] = series;
      setAllSeries(newAllSeries);
    }
  }, [series]);

  return (
    <div className="">
      <hr/>
      <div className="row">
        {series.map((val, i) => (
          <GridButton
            key={val.key}
            index={i}
            series={series}
            setSeries={setSeries}
          />
        ))}
        <Slider
        label="filter"
        min={0}
        max={100}
        value={filter}
        onChange={(event) => {
          setFilter(event.target.value);
        }}
      />
      </div>
    </div>
  );
}

export default Grid;
