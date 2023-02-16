import React, { useEffect } from "react";
import GridButton from "../GridButton";

function getBlueprint() {
  let arr = [];
  for (let i = 0; i < 16; i++) {
    if (i % 2) arr.push({ pressed: false, note: "C4", key: Math.random() });
    else
    arr.push({ pressed: true, note: "C4", key: Math.random() });
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
      </div>
    </div>
  );
}

export default Grid;
