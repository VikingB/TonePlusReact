import React, { useEffect } from "react";
import * as Tone from "tone";
import Slider from "../Slider";
import SynthPanel from "../SynthPanel";

const synthObj = {
  harmonicity: 8,
  modulationIndex: 2,
  oscillator: {
    type: "sine",
  },
  envelope: {
    attack: 0.001,
    decay: 2,
    sustain: 0.9,
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
};

function Synth({ setSynths }) {
  const [synth, setSynth] = React.useState(null);
  // const [filters, setFilters] = React.useState({});

  useEffect(() => {
    const synth = new Tone.Synth(synthObj).toDestination();
    const panner1 = new Tone.Panner(-1).toDestination();
    synth.connect(panner1);
    synth.volume.value = -16;
    setSynths((currentSynths) => [...currentSynths, synth]);
    setSynth(synth);
    return () => {
      synth.dispose();
      panner1.dispose();
    };
  }, []);
  
  
  function saveSynthToState(nextSynth) {
    setSynth(nextSynth);

    // replace this synth with the new synth
    setSynths((currentSynths) => {
      currentSynths.forEach((element) => {
        if (element === synth) {
          element = nextSynth;
        }
      });
      return currentSynths;
    });
  }


  return (
      <SynthPanel synth={synth} saveSynthToState={saveSynthToState} />
  );
}

export default Synth;
