import { useRef, useState } from "react";

import {
  stopCamera,
  startDetection,
} from "../utils/utils";


function FaceExpression() {

  const videoRef =
    useRef(null);

  const streamRef =
    useRef(null);

  const landmarkerRef =
    useRef(null);

  const frameRef =
    useRef(null);


  const [cameraOn, setCameraOn] =
    useState(false);

  const [detecting, setDetecting] =
    useState(false);

  const [expression, setExpression] =
    useState("");


  return (
    <div className="expression-container">

      <h1>
        Facial Expression Detection
      </h1>


      <div className="camera-wrapper">

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
        />

      </div>


      <div className="expression-result">

        {expression}

      </div>


      <div className="button-group">

        <button
          className="gradient-button"

          onClick={() =>
            startDetection({
              videoRef,
              streamRef,
              landmarkerRef,
              frameRef,
              setCameraOn,
              setDetecting,
              setExpression,
            })
          }

          disabled={detecting}
        >

          {detecting
            ? "Detecting..."
            : cameraOn
            ? "Detect Expression"
            : "Start Camera"}

        </button>


        <button
          className="gradient-button"

          onClick={() =>
            stopCamera({
              videoRef,
              streamRef,
              landmarkerRef,
              frameRef,
              setCameraOn,
              setDetecting,
              setExpression,
            })
          }

          disabled={!cameraOn}
        >

          Stop Camera

        </button>

      </div>

    </div>
  );
}


export default FaceExpression;