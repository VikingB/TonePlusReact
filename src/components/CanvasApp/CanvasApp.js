import React from "react";
import Canvas from '../Canvas';
import Range from '../Range';

function CanvasApp({step}) {
  const [rectHeight, setRectHeight] = React.useState(1);
  const [rectWidth, setRectWidth] = React.useState(1);
  return <>
    <Canvas rectHeight={rectHeight + (step % 32)} rectWidth={rectWidth + (step % 16)} step={step} />
        <Range string="rectHeight" value={rectHeight } setValue={setRectHeight}   />
        <Range string="rectWidth" value={rectWidth} setValue={setRectWidth}   />
  
  </>;
}

export default CanvasApp;
