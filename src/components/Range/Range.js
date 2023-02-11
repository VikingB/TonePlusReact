import React from "react";

function Range({value,setValue,string = ''}) {
  return (
    <>
      <div>
        <input
          type="range"
          id="lines"
          name="lines"
          min="0"
          max="500"
          value={value}
          step="1"
          onChange={(e) => setValue(e.target.value)}
        />
        <label htmlFor="lines"> {string}: ({value}) </label>
      </div>
    </>
  );
}

export default Range;
