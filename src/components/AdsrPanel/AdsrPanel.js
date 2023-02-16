import React from "react";
import * as Tone from "tone";
import Slider from "../Slider";

function AdsrPanel({ synth, saveSynthToState }) {
  const [attack , setAttack] = React.useState(synth.envelope.attack);
  const [decay , setDecay] = React.useState(synth.envelope.decay);
  const [sustain , setSustain] = React.useState(synth.envelope.sustain);
  const [release , setRelease] = React.useState(synth.envelope.release);
  return <>
    <Slider
      label={`Attack: ${attack}`}
      min={0}
      max={1}
      step={0.01}
      value={attack}
      onChange={(event) => {
        setAttack(event.target.value);
        let nextSynth = synth;
        nextSynth.envelope.attack = event.target.value;
        saveSynthToState(nextSynth);

      }}
    />
    <Slider

      label={`Decay: ${synth?.envelope.decay}`}
      min={0}
      max={1}
      step={0.01}
      value={decay}
      onChange={(event) => {
        setDecay(event.target.value);
        let nextSynth = synth;
        nextSynth.envelope.decay = event.target.value;
        saveSynthToState(nextSynth);
      }}
    />
    <Slider

      label={`Sustain: ${synth.envelope.sustain}`}
      min={0}
      max={1}
      step={0.01}
      value={sustain}
      onChange={(event) => {
        setSustain(event.target.value);
        let nextSynth = synth;
        nextSynth.envelope.sustain = event.target.value;
        saveSynthToState(nextSynth);
      }}
    />
    <Slider
    label={`Release: ${synth.envelope.release}`}
    min={0}
    max={1}
    step={0.01}
    value={release}
    onChange={(event) => {
      setRelease(event.target.value);
      let nextSynth = synth;
      nextSynth.envelope.release = event.target.value;
      saveSynthToState(nextSynth);
    }}
    />
  </>;
}

export default AdsrPanel;
