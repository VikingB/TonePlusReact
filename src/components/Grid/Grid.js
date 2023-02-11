import React from "react";
import {range} from "../../utils";
import GridButton from "../GridButton";

function Grid({step, series, setSeries}) {



  return (
    <div className="">
      <div className="row">

        {series.map((val ,i) => (
          <GridButton key={val.key} index={i} series={series} setSeries={setSeries}/>
        ))}
      </div>
    </div>
  );
}

export default Grid;
