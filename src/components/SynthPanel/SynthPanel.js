import React from "react";
import * as Tone from "tone";

import Slider from "../Slider";
import AdsrPanel from "../AdsrPanel";

function SynthPanel({ synth, saveSynthToState }) {
  const [delay, setDelay] = React.useState(null);
  const [delayDryWet, setDelayDryWet] = React.useState(0.5);
  console.log("synthpanel");

  function addDelay() {
    let newDelay = new Tone.FeedbackDelay("8n", 0.5);
    setDelay(newDelay);
    newDelay.toDestination();
    let nextSynth = synth;
    nextSynth.connect(newDelay);
    console.log("add delay");

    saveSynthToState(nextSynth);
  }

  function handleDelayChange(event) {
    setDelayDryWet(event.target.value);
    delay.wet.value = event.target.value;
    let nextSynth = synth;
    nextSynth.connect(delay);
    saveSynthToState(nextSynth);
  }
  function addReverb() {
    let reverb = new Tone.Reverb({
      decay: 9,
      preDelay: 0.01,
      wet: 1,
    });
    reverb.toDestination();
    let nextSynth = synth;
    nextSynth.connect(reverb);
    saveSynthToState(nextSynth);
  }

  function testSynthEnvelope() {
    let nextSynth = synth;
    nextSynth.envelope.attack = 0.9;

    saveSynthToState(nextSynth);
    console.log(synth);
  }

  return (
    <div className="synth-panel">
      {synth && <AdsrPanel synth={synth} saveSynthToState={saveSynthToState} />}

      <div className="buttons">
        {!delay && <button onClick={addDelay}>Add Delay</button>}
        {delay && (
          <Slider
            label={`Delay Dry/Wet: ${delayDryWet}`}
            min={0}
            max={1}
            step={0.01}
            value={delayDryWet}
            onChange={handleDelayChange}
          />
        )}
        <button onClick={addReverb}>Add Reverb</button>
      </div>
    </div>
  );
}

export default SynthPanel;
