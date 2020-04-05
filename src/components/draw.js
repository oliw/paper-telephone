import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, css } from "aphrodite";
import Button from "common/button";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  canvas: {
    display: "none"
  },
  buttonsContainer: {
    display: "flex"
  }
});

function Drawer(props) {
  const { onImageSelected, previousPhrase } = props;

  const videoEl = useRef(null);
  const canvasEl = useRef(null);

  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    if (!videoEl || imageData) {
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      let video = videoEl.current;
      video.srcObject = stream;
      video.play();
    });
  }, [videoEl, imageData]);

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
    <div className={css(styles.container)}>
      <div className={css(styles.header)}>
        <p>Time to draw!</p>
      </div>
      <div className={css(styles.promptContainer)}>
        <p>Can you draw this phrase and take a picture of it?</p>
        <p>{previousPhrase}</p>
      </div>
      <div className={css(styles.drawingContainer)}>
        {!imageData && (
          <>
            <video ref={videoEl} autoPlay={true}></video>
            <canvas
              className={css(styles.canvas)}
              ref={canvasEl}
              width={640}
              height={480}
            ></canvas>
          </>
        )}
        {imageData && <img src={imageData} alt="Foo" />}
      </div>
      <div className={css(styles.buttonsContainer)}>
        {!imageData && (
          <Button type="primary" onClick={handleTakePicClick}>
            Take picture
          </Button>
        )}
        {imageData && (
          <Button type="primary" onClick={handleClick}>
            Submit
          </Button>
        )}
        {imageData && (
          <Button onClick={() => setImageData(null)}>
            Take a different picture
          </Button>
        )}
      </div>
    </div>
  );
}

export default Drawer;
