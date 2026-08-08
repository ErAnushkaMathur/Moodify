import { useRef, useState, useEffect } from "react";

import {
  startCameraOnly,
  stopCamera,
  startDetection,
} from "../utils/utils";

import { mapExpressionToMood } from "../utils/moodMapper";
import { useSong } from "../../home/hooks/useSong";
import Player from "../../home/components/Player";


function FaceExpression() {

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const landmarkerRef = useRef(null);
  const frameRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [starting, setStarting] = useState(false);
  const [expression, setExpression] = useState("😐 Neutral");

  const { handleGetSong } = useSong();

  useEffect(() => {
    const mood = mapExpressionToMood(expression);
    if (!mood) return;

    handleGetSong(mood);
  }, [expression]);

  return (
    <div className="expression-container">

      <h1>Facial Expression Detection</h1>

      <div className="camera-wrapper">
        <video ref={videoRef} autoPlay playsInline muted />
      </div>

      <div className="expression-result">{expression}</div>

      <Player />

      <div className="button-group">

        <button
          className="gradient-button"
          onClick={async () => {
            if (!cameraOn) {
              setStarting(true);
              await startCameraOnly({
                videoRef, streamRef, landmarkerRef,
                setCameraOn, setExpression,
              });
              setStarting(false);
            } else {
              startDetection({
                videoRef, streamRef, landmarkerRef, frameRef,
                setDetecting, setExpression,
              });
            }
          }}
          disabled={detecting || starting}
        >
          {starting
            ? "Starting camera..."
            : detecting
              ? "Detecting..."
              : cameraOn
                ? "Detect Expression"
                : "Start Camera"}
        </button>

        <button
          className="gradient-button"
          onClick={() =>
            stopCamera({
              videoRef, streamRef, landmarkerRef, frameRef,
              setCameraOn, setDetecting, setExpression,
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