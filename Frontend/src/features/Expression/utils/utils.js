import {
  startCamera,
  stopCameraModel,
} from "../models/cameraModel";


// ==========================================
// START DETECTION
// ==========================================

export const startDetection = async ({
  videoRef,
  streamRef,
  landmarkerRef,
  frameRef,
  setCameraOn,
  setDetecting,
  setExpression,
}) => {
  try {
    // Start camera + MediaPipe
    if (!streamRef.current) {
      const {
        stream,
        landmarker,
      } = await startCamera(
        videoRef.current
      );

      streamRef.current = stream;

      landmarkerRef.current =
        landmarker;

      setCameraOn(true);
    }

    // Start detecting
    setDetecting(false);

    setExpression(
      "Detecting..."
    );

    detectExpression({
      videoRef,
      streamRef,
      landmarkerRef,
      frameRef,
      setDetecting,
      setExpression,
    });

  } catch (error) {
    console.error(
      "Camera / MediaPipe error:",
      error
    );

    setExpression(
      "Unable to access camera"
    );
  }
};


// ==========================================
// DETECT EXPRESSION
// ==========================================

export const detectExpression = ({
  videoRef,
  streamRef,
  landmarkerRef,
  frameRef,
  setDetecting,
  setExpression,
}) => {

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


  // Face detected
  if (
    result.faceBlendshapes &&
    result.faceBlendshapes.length > 0
  ) {

    const shapes =
      result.faceBlendshapes[0].categories;


    // Angry
    const angry =
      (
        getScore(
          shapes,
          "browDownLeft"
        ) +
        getScore(
          shapes,
          "browDownRight"
        ) +
        getScore(
          shapes,
          "eyeSquintLeft"
        ) +
        getScore(
          shapes,
          "eyeSquintRight"
        )
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
     
      console.log({
  mouthOpen,
  browUp,
  smile,
  angry,
  frown
});

   let detectedExpression = "😐 Neutral";

if (
  mouthOpen > 0.02 &&
  browUp > 0.04
) {
  detectedExpression = "😮 Surprised";

} else if (smile > 0.06) {
  detectedExpression = "😊 Happy";

} else if (angry > 0.1) {
  detectedExpression = "😠 Angry";

} else if (frown > 0.0015) {
  detectedExpression = "😢 Sad";
}


    setExpression(
      detectedExpression
    );


    // Stop detecting
    // Camera remains ON
    setDetecting(false);

    return;
  }


  // No face yet
  // Continue detection

  frameRef.current =
    requestAnimationFrame(() =>
      detectExpression({
        videoRef,
        streamRef,
        landmarkerRef,
        frameRef,
        setDetecting,
        setExpression,
      })
    );
};


// ==========================================
// STOP CAMERA
// ==========================================

export const stopCamera = ({
  videoRef,
  streamRef,
  landmarkerRef,
  frameRef,
  setCameraOn,
  setDetecting,
  setExpression,
}) => {

  // Stop animation
  if (frameRef.current) {

    cancelAnimationFrame(
      frameRef.current
    );

    frameRef.current = null;
  }


  // Stop camera + MediaPipe
  stopCameraModel(
    streamRef.current,
    landmarkerRef.current,
    videoRef.current
  );


  // Clear refs
  streamRef.current = null;

  landmarkerRef.current = null;


  // Update React state
  setCameraOn(false);

  setDetecting(false);

  setExpression("");
};


// ==========================================
// GET SCORE
// ==========================================

export const getScore = (
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