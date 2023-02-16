import React from "react";
import Header from "../Header";
import CanvasApp from "../CanvasApp";
import * as Tone from "tone";
import StepIndicator from "../StepIndicator";
import Instruments from "../Instruments";
import { IDs } from "./utilityObjects";
import { useSynth } from "./synthHooks";
import Synth from "../Synth/Synth";

const synth = new Tone.Synth({
  harmonicity: 8,
  modulationIndex: 2,
  oscillator: {
    type: "sine",
  },
  envelope: {
    attack: 0.001,
    decay: 2,
    sustain: 0.1,
    release: 2,
  },
  modulation: {
    type: "square",
  },
  modulationEnvelope: {
    attack: 0.002,
    decay: 0.2,
    sustain: 0,
    release: 0.2,
  },
}).toDestination();
const synth2 = new Tone.Synth({
  harmonicity: 8,
  modulationIndex: 2,
  oscillator: {
    type: "sine",
  },
  envelope: {
    attack: 0.001,
    decay: 2,
    sustain: 0.1,
    release: 2,
  },
  modulation: {
    type: "square",
  },
  modulationEnvelope: {
    attack: 0.002,
    decay: 0.2,
    sustain: 0,
    release: 0.2,
  },
}).toDestination();
const synth3 = new Tone.Synth({
  harmonicity: 8,
  modulationIndex: 2,
  oscillator: {
    type: "sine",
  },
  envelope: {
    attack: 0.001,
    decay: 2,
    sustain: 0.1,
    release: 2,
  },
  modulation: {
    type: "square",
  },
  modulationEnvelope: {
    attack: 0.002,
    decay: 0.2,
    sustain: 0,
    release: 0.2,
  },
}).toDestination();
const synth4 = new Tone.Synth({
  harmonicity: 8,
  modulationIndex: 2,
  oscillator: {
    type: "sine",
  },
  envelope: {
    attack: 0.001,
    decay: 2,
    sustain: 0.1,
    release: 2,
  },
  modulation: {
    type: "square",
  },
  modulationEnvelope: {
    attack: 0.002,
    decay: 0.2,
    sustain: 0,
    release: 0.2,
  },
}).toDestination();
synth.volume.value = -16;
synth2.volume.value = -16;
synth3.volume.value = -20;
synth4.volume.value = -6;

// const preSynths = [synth, synth2, synth3, synth4];
const preSynths = [];


const pingPong = new Tone.PingPongDelay("4n", 0.2);

function App() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [allSeries, setAllSeries] = React.useState({});
  const [delay, setDelay] = React.useState(0);
  const [step, setStep] = React.useState(-1);
  const [synths , setSynths] = React.useState(preSynths);

  const stepRef = React.useRef();
  stepRef.current = step;
  const delayRef = React.useRef();
  delayRef.current = delay;

  

  
  function startLoop() {
    if (isPlaying) return;
    Tone.start();
    Tone.Transport.start();
    setIsPlaying(true);
    registerLoop();
  }
  function stopLoop() {
    Tone.Transport.cancel();
    setIsPlaying(false);
    setStep(-1);
  }
  function registerLoop() {
    Tone.Transport.bpm.value = 40;
   let tick = 0;
    Tone.Transport.start();
    const loop = new Tone.Loop((time) => {
      // triggered every eighth note.
      setStep((current) => current + 1);
      playSeries(tick);
      tick++
    }, "8n").start(0);
  }
  
  function playSeries(tick) {
    console.log('synths', synths)
    console.log(allSeries)
    if (
      Object.keys(allSeries).length === 0 &&
      allSeries.constructor === Object
      ) {
        return;
      }
      const now = Tone.now();

    pingPong.wet.value = delayRef.current;

    let keys = Object.keys(allSeries);
    for (let key in keys) {
      let instrument = allSeries[keys[key]];
      if (instrument.series[tick % 16]?.pressed) {
        // synths[key].triggerAttackRelease(instrument.series[step % 16].note, "4n", now + key);
        synths[key].triggerAttackRelease(
          instrument.series[tick % 16].note,
          "8n",
          now
        );
      }
    }
  }

  // React.useEffect(() => {

  //   // playSeries(step);
  // }, [step]);

  return (
    <div className="wrapper">


      <div className="sequencer">
        <StepIndicator step={step % 16} delay={delay} setDelay={setDelay} />
        <Instruments
          IDs={IDs}
          step={step % 16}
          allSeries={allSeries}
          setAllSeries={setAllSeries}
          defaultNumberOfInstruments={synths.length}
          synths={synths}
        />
        <div className="synths">
          <Synth setSynths={setSynths}/>
          <Synth setSynths={setSynths}/>
          {/* <Synth setSynths={setSynths}/>
          <Synth setSynths={setSynths}/> */}
        </div>
        <div className="row-right">
          <button onClick={startLoop}>play me</button>
          <button onClick={stopLoop}>stop me</button>
        </div>
        {/* <CanvasApp step={step} /> */}
        
      </div>
    </div>
  );
}

export default App;
