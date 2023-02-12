import React from "react";
const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C4", "D4", "E4"];
function GridButton({ series, setSeries, index: i }) {
  const [numberOfClicks, setNumberOfClicks] = React.useState(0);
  function toggleStep(i) {
    const newSeries = [...series];
    newSeries[i].pressed = !newSeries[i].pressed;
    setSeries(newSeries);
  }
  function switchNotes() {
    setNumberOfClicks(numberOfClicks + 1);
    const newSeries = [...series];
    newSeries[i].note = notes[(numberOfClicks + 1) % notes.length];
    setSeries(newSeries);
  }
  function getClass(i) {
    if (series[i].pressed) return "pressed";
    return "";
  }
  return (
    <div className="gridButton">
      <button className="switchButton"
      onClick={() => switchNotes()}>{series[i].note}</button>
      <button
        className={`toggleButton cell ${getClass(i)}`}
        key={i}
        onClick={() => toggleStep(i)}
      >
        {i + 1}
      </button>
    </div>
  );
}

export default GridButton;
