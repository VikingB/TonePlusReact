import React from "react";
import { range } from "../../utils";
import Slider from "../Slider";

function StepIndicator({ step, delay, setDelay }) {
  
  return (
    <div className="stepindicator">
      <div className="row no-marg">
        {range(16).map((i) => (
          <div className={`cell ${step === i ? "active" : ""}`} key={i}>
            <div className="lamp"></div>
            <div className="lamp blur"></div>
          </div>
        ))}
        {/* <Slider
          label="Delay Dry/Wet"
          min={0}
          max={1}
          step={0.01}
          value={delay}
          onChange={(event) => setDelay(event.target.value)}
        /> */}
      </div>
    </div>
  );
}

export default StepIndicator;
