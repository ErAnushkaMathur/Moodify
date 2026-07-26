import { useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

function FaceExpression() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const landmarkerRef = useRef(null);
  const frameRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [expression, setExpression] = useState(
    ""
  );

  // ==========================================
  // START CAMERA + INITIALIZE MEDIAPIPE
  // ==========================================

  

  // ==========================================
  // START ONE EXPRESSION DETECTION
  // ==========================================

  const startDetection = async () => {
    try {
      // Start camera if not already running
      await startCamera();

      // Wait until MediaPipe is ready
      if (!landmarkerRef.current) {
        return;
      }

      setDetecting(true);
      setExpression("Detecting...");

      // Start detection
      detectExpression();

    } catch (error) {
      console.error(error);
    }
  };

  // ==========================================
  // DETECT ONE EXPRESSION
  // ==========================================

  const detectExpression = () => {
    if (
      !videoRef.current ||
      !landmarkerRef.current ||
      !streamRef.current
    ) {
      return;
    }

    const result =
      landmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
      );

    // Check if face is detected
    if (
      result.faceBlendshapes &&
      result.faceBlendshapes.length > 0
    ) {
      const shapes =
        result.faceBlendshapes[0].categories;

        //Angry 
        const angry =
  (
    getScore(shapes, "browDownLeft") +
    getScore(shapes, "browDownRight") +
    getScore(shapes, "eyeSquintLeft") +
    getScore(shapes, "eyeSquintRight")
  ) / 4;

      // Smile
      const smile =
        (
          getScore(
            shapes,
            "mouthSmileLeft"
          ) +
          getScore(
            shapes,
            "mouthSmileRight"
          )
        ) / 2;

      // Frown
      const frown =
        (
          getScore(
            shapes,
            "mouthFrownLeft"
          ) +
          getScore(
            shapes,
            "mouthFrownRight"
          )
        ) / 2;

      // Mouth open
      const mouthOpen =
        getScore(
          shapes,
          "jawOpen"
        );

      // Eyebrows raised
      const browUp =
        getScore(
          shapes,
          "browInnerUp"
        );

      let detectedExpression =
        "😐 Neutral";

      // Happy
      if (smile > 0.4) {
        detectedExpression =
          "😊 Happy";
      }
      else if (angry > 0.090) {
  detectedExpression = "😠 Angry";
} 

      // Surprised
      else if (
        mouthOpen > 0.4 &&
        browUp > 0.2
      ) {
        detectedExpression =
          "😮 Surprised";
      }

      // Sad
      else if (
        frown > 0.0015
      ) {
        detectedExpression =
          "😢 Sad";
      }

      // Mouth Open
      else if (
        mouthOpen > 0.5
      ) {
        detectedExpression =
          "😮 Mouth Open";
      }

      // Show expression
      setExpression(
        detectedExpression
      );

      // Stop DETECTION only
      // Camera remains ON
      setDetecting(false);

      return;
    }

    // No face found
    // Continue looking
    frameRef.current =
      requestAnimationFrame(
        detectExpression
      );
  };

  // ==========================================
  // STOP CAMERA COMPLETELY
  // ==========================================

  const stopCamera = () => {
    // Stop detection loop
    if (frameRef.current) {
      cancelAnimationFrame(
        frameRef.current
      );

      frameRef.current = null;
    }

    setDetecting(false);

    // Stop camera
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => {
          track.stop();
        });

      streamRef.current = null;
    }

    // Remove video stream
    if (videoRef.current) {
      videoRef.current.srcObject =
        null;
    }

    // Close MediaPipe
    if (landmarkerRef.current) {
      landmarkerRef.current.close();

      landmarkerRef.current =
        null;
    }

    setCameraOn(false);

   
  };

  // ==========================================
  // GET BLENDSHAPE SCORE
  // ==========================================

  const getScore = (
    shapes,
    name
  ) => {
    return (
      shapes.find(
        (shape) =>
          shape.categoryName === name
      )?.score || 0
    );
  };

  // ==========================================
  // UI
  // ==========================================

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
        onClick={startDetection}
        disabled={detecting}
      >
        {detecting
          ? "Detecting..."
          : "Detect Expression"}
      </button>

      <button
        className="gradient-button"
        onClick={stopCamera}
        disabled={!cameraOn}
      >
        Stop Camera
      </button>

    </div>

  </div>
);
}

export default FaceExpression;