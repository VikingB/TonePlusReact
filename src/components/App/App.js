import React from "react";
import Header from "../Header";
import { range } from "../../utils";

import CanvasApp from "../CanvasApp";
import * as Tone from "tone";
import Grid from "../Grid";
import StepIndicator from "../StepIndicator";
import Instruments from "../Instruments";

const synth = new Tone.Synth({
  "harmonicity":8,
  "modulationIndex": 2,
  "oscillator" : {
      "type": "sine"
  },
  "envelope": {
      "attack": 0.001,
      "decay": 2,
      "sustain": 0.1,
      "release": 2
  },
  "modulation" : {
      "type" : "square"
  },
  "modulationEnvelope" : {
      "attack": 0.002,
      "decay": 0.2,
      "sustain": 0,
      "release": 0.2
  }
}).toDestination();
const synth2 = new Tone.Synth({

  "harmonicity":8,
  "modulationIndex": 2,
  "oscillator" : {
      "type": "sine"
  },
  "envelope": {
      "attack": 0.001,
      "decay": 2,
      "sustain": 0.1,
      "release": 2
  },
  "modulation" : {
      "type" : "square"
  },
  "modulationEnvelope" : {
      "attack": 0.002,
      "decay": 0.2,
      "sustain": 0,
      "release": 0.2
  }
}).toDestination();
const synth3 = new Tone.Synth({
  "harmonicity":8,
  "modulationIndex": 2,
  "oscillator" : {
      "type": "sine"
  },
  "envelope": {
      "attack": 0.001,
      "decay": 2,
      "sustain": 0.1,
      "release": 2
  },
  "modulation" : {
      "type" : "square"
  },
  "modulationEnvelope" : {
      "attack": 0.002,
      "decay": 0.2,
      "sustain": 0,
      "release": 0.2
  }
}).toDestination();
const synth4 = new Tone.Synth({
  "harmonicity":8,
  "modulationIndex": 2,
  "oscillator" : {
      "type": "sine"
  },
  "envelope": {
      "attack": 0.001,
      "decay": 2,
      "sustain": 0.1,
      "release": 2
  },
  "modulation" : {
      "type" : "square"
  },
  "modulationEnvelope" : {
      "attack": 0.002,
      "decay": 0.2,
      "sustain": 0,
      "release": 0.2
  }
}).toDestination();

const synths = [synth, synth2, synth3, synth4];

const IDs = [
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
]


function App() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [allSeries, setAllSeries] = React.useState({});
  const [step, setStep] = React.useState(-1);


  console.log(allSeries)

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



    Tone.Transport.bpm.value = 120;
    const loop = new Tone.Loop((time) => {
      // triggered every eighth note.
      setStep((current) => current + 1);
      playSeries();
    }, "8n").start(0);
  }

  function playSeries() {
    if(!isPlaying) return;
    Tone.Transport.start();
    const now = Tone.now();
      // allSeries.map((series, i) => {
      //   console.log(series)
      // })

      if(Object.keys(allSeries).length === 0 && allSeries.constructor === Object) {
        console.log('empty')
        return
      }


      let keys = Object.keys(allSeries);
      for(let key in keys){
        // console.log('hejhej')
        // console.log(keys[key])
        // console.log(allSeries[keys[key]])
        // console.log(allSeries[keys[key]][step % 16].note)
        if(allSeries[keys[key]][step % 16]?.pressed){
          synths[key].triggerAttackRelease(allSeries[keys[key]][step % 16].note, "4n", now + key);
          console.log(allSeries[keys[key]][step % 16].note)
        }
        allSeries[keys[key]].forEach(element => {
          
          
        });


      }
      return
      Object.entries(allSeries).map(series => {
        console.log(series)
      if (series[1][step % 16]?.pressed) {
        synth2.triggerAttackRelease(series[step % 16].note, "4n", now);
      }
    });
    // if (series2[step % 16]?.pressed) {
    //   // console.log(series2[step % 16].note)
    //   // synth2.triggerAttackRelease(series2[step % 16].note, "4n", now);
    // }
    // synth.triggerAttackRelease("A5", "4n", now);
  }

  React.useEffect(() => {
    playSeries();
  }, [step]);

  return (
    <div className="wrapper">
      <Header>{isPlaying && (step % 16) + 1}</Header>

      <div className="sequencer">
        <StepIndicator step={step % 16} />
        <Instruments IDs={IDs} step={step % 16} allSeries={allSeries} setAllSeries={setAllSeries} />
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
