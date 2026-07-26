const startCamera = async () => {
    try {
      // Camera already running
      if (streamRef.current) {
        return;
      }

      // Ask camera permission
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

      streamRef.current = stream;

      // Show live camera
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraOn(true);

      // Initialize MediaPipe only once
      if (!landmarkerRef.current) {
        setExpression("Loading...");

        const vision =
          await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
          );

        landmarkerRef.current =
          await FaceLandmarker.createFromOptions(
            vision,
            {
              baseOptions: {
                modelAssetPath:
                  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                delegate: "GPU",
              },

              runningMode: "VIDEO",
              numFaces: 1,
              outputFaceBlendshapes: true,
            }
          );
      }

      setExpression(
        "Camera ready. Click Start Detection"
      );

    } catch (error) {
      console.error(
        "Camera / MediaPipe Error:",
        error
      );

      setExpression(
        "Unable to access camera"
      );

      setCameraOn(false);
    }
  };