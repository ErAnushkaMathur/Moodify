import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

const WASM_URL =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";

const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

export const startCamera = async (
  videoElement
) => {
  // Start camera
  const stream =
    await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

  // Connect camera to video
  videoElement.srcObject = stream;

  await videoElement.play();

  // Initialize MediaPipe
  const vision =
    await FilesetResolver.forVisionTasks(
      WASM_URL
    );

  const landmarker =
    await FaceLandmarker.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath: MODEL_URL,
          delegate: "GPU",
        },

        runningMode: "VIDEO",
        numFaces: 1,
        outputFaceBlendshapes: true,
      }
    );

  return {
    stream,
    landmarker,
  };
};

export const stopCameraModel = (
  stream,
  landmarker,
  videoElement
) => {
  // Stop camera
  if (stream) {
    stream
      .getTracks()
      .forEach((track) => {
        track.stop();
      });
  }

  // Remove camera from video
  if (videoElement) {
    videoElement.srcObject = null;
  }

  // Close MediaPipe
  if (landmarker) {
    landmarker.close();
  }
};