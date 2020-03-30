import React, { useState, useEffect, useRef } from "react";

function Drawer(props) {
  const { onImageSelected, previousPhrase } = props;

  const videoEl = useRef(null);
  const canvasEl = useRef(null);

  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    if (!videoEl) {
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      let video = videoEl.current;
      video.srcObject = stream;
      video.play();
    });
  }, [videoEl]);

  const handleTakePicClick = () => {
    var ctx = canvasEl.current.getContext("2d");
    ctx.drawImage(
      videoEl.current,
      0,
      0,
      canvasEl.current.width,
      canvasEl.current.height
    );
    setImageData(canvasEl.current.toDataURL("image/jpeg"));
  };

  const handleClick = () => {
    if (onImageSelected) {
      onImageSelected(imageData);
    }
  };

  return (
    <div>
      <p>Time to draw!</p>
      <p>Can you draw this phrase?</p>
      <p>{previousPhrase}</p>
      <video ref={videoEl} autoPlay={true}></video>
      <canvas ref={canvasEl} width={480} height={640}></canvas>
      <button onClick={handleTakePicClick}>Take Pic</button>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default Drawer;
