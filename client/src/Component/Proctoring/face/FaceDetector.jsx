import { useEffect, useRef } from "react";
import * as faceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";

export default function FaceDetector({ onFaceStatus, videoRef }) {

  const cameraRef = useRef(null);        // mediapipe camera instance
  const detectorRef = useRef(null);      // face detector instance
  const startedRef = useRef(false);      // prevent double start (React strict mode)

  useEffect(() => {

    // react strict mode me useEffect 2 baar chalta hai → camera 2 baar open hota
    if (startedRef.current) return;
    startedRef.current = true;

    let active = true;

    async function init() {
      try {
        // -------- create face detector --------
        detectorRef.current = new faceDetection.FaceDetection({
          locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
        });

        // detection accuracy settings
        detectorRef.current.setOptions({
          model: "short",
          minDetectionConfidence: 0.6,
        });

        // jab bhi detection milega
        detectorRef.current.onResults((results) => {
          if (!active) return;

          const count = results.detections?.length || 0;

          // parent component ko data bhejna
          onFaceStatus({
            count,
            timestamp: Date.now(),
          });
        });

        // -------- open webcam --------
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (!active) return;

        videoRef.current.srcObject = stream;

        // -------- mediapipe camera wrapper --------
        cameraRef.current = new Camera(videoRef.current, {
          onFrame: async () => {
            if (detectorRef.current && videoRef.current) {
              await detectorRef.current.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480,
        });

        cameraRef.current.start();

      } catch (err) {
        console.error("Camera Permission Denied / Not Available", err);
      }
    }

    init();

    // -------- cleanup --------
    return () => {
      active = false;

      cameraRef.current?.stop();

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach(track => track.stop());
      }

      detectorRef.current?.close?.();
    };

  }, []);

  // hidden processing video (user ko visible nahi)
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      style={{
        position: "fixed",
        top: "-9999px",
        left: "-9999px",
        width: "640px",
        height: "480px",
      }}
    />
  );
}