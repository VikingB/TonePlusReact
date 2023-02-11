import React from "react";
const getRandomX = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
const getRandomY = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
// get 10 random coordinates
const randomCoordinates = Array.from({ length: 100 }, () => [
  getRandomX(500),
  getRandomY(500),
]);

function Canvas({ rectHeight,rectWidth, step }) {
  const canvas = React.useRef(null);
  // get random number between 0 and 255
  

  React.useEffect(() => {

    const ctx = canvas.current.getContext("2d");
    ctx.clearRect(0, 0, 800, 800);
    ctx.fillStyle = "#FF0000";
    randomCoordinates.forEach(([x, y], i) => {
      if(i < step ){
        ctx.fillRect(x ,y , rectHeight, rectWidth);
      }

    });

  }, [rectHeight,rectWidth]);
  return <canvas ref={canvas} width="800px" height="800px" />;
}

export default Canvas;
