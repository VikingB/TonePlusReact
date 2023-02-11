import React from "react";
import Header from "../Header";
import { range } from "../../utils";

import CanvasApp from "../CanvasApp";
import * as Tone from "tone";
import Grid from "../Grid";
import StepIndicator from "../StepIndicator";

const synth = new Tone.Synth({
  oscillator: {
    partials: [1, 0, 2, 0, 3],
  },
  envelope: {
    attack: 0.001,
    decay: 1.2,
    sustain: 0,
    release: 2.2,
  },
}).toDestination();
const synth2 = new Tone.Synth({
  "oscillator": {
      "type": "fatcustom",
      "partials" : [0.2, 1, 0, 0.5, 0.1],
      "spread" : 40,
      "count" : 3
  },
  "envelope": {
      "attack": 0.001,
      "decay": 1.6,
      "sustain": 0,
      "release": 1.6
  }
}).toDestination();


const seriesBluePrint = [
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() }, 
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
];
const seriesBluePrint2 = [
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
  { pressed: false, note: 'C4', key: Math.random() },
];


function App() {
  console.log("rerender!");
  const [isPlaying, setIsPlaying] = React.useState(false);

  const [step, setStep] = React.useState(-1);

  const [series, setSeries] = React.useState([...seriesBluePrint]);
  const [series2, setSeries2] = React.useState([...seriesBluePrint2]);

  function startLoop() {
    if(isPlaying) return;
    Tone.start();
    Tone.Transport.start();
    registerLoop();
    setIsPlaying(true);
  }
  function stopLoop() {
    Tone.Transport.cancel();
    setIsPlaying(false);
    setStep(-1);
  }
  function registerLoop() {
    const loop = new Tone.Loop((time) => {
      // triggered every eighth note.
      setStep((current) => current + 1);
    }, "8n").start(0);
  }

  function playSynth() {
    Tone.Transport.start();
    

    const now = Tone.now();
    if (series[step % 16]?.pressed) {
      synth.triggerAttackRelease(series[step % 16].note, "4n", now);
    }
    if (series2[step % 16]?.pressed) {
      console.log(series2)
      console.log(series2[step % 16].note)
      synth2.triggerAttackRelease(series2[step % 16].note, "2n", now);
    }
    // synth.triggerAttackRelease("A5", "4n", now);
  }

  React.useEffect(() => {
    playSynth();
  }, [step]);

  return (
    <div className="wrapper">
      <Header>{isPlaying && (step % 16) + 1}</Header>

      <div className="sequencer">
        <StepIndicator step={step % 16} />
        <Grid step={step % 16} series={series} setSeries={setSeries} />
        <Grid step={step % 16} series={series2} setSeries={setSeries2} />
        <div className="row-center">
          <button onClick={startLoop}>play me</button>
          <button onClick={stopLoop}>stop me</button>
        </div>
      {/* <CanvasApp step={step} /> */}
      </div>
    </div>
  );
}

export default App;
