import React from "react";
import { range } from "../../utils";

function StepIndicator({step}) {
  
  return (
    <div className="stepindicator">
      <div className="row">
        {range(16).map((i) => (
          <div
            className={`cell ${step === i ? "active" : ""}`}
            key={i}
          >-</div>
        ))}
      </div>
    </div>
  );
}

export default StepIndicator;
