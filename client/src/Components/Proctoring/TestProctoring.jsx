import { useRef, useState } from "react";
import FaceDetector from "./face/FaceDetector";

export default function TestProctoring() {

  const videoRef = useRef(null);
  const [status, setStatus] = useState("Waiting...");
  const [count, setCount] = useState(0);

  const handleFaceStatus = ({ count }) => {
    setCount(count);

    if (count === 0) setStatus("No Face ");
    else if (count > 1) setStatus("Multiple Faces ");
    else setStatus("Normal ");
  };

  return (
    <div style={{ textAlign:"center", marginTop:"40px" }}>
      <h1>Proctoring Test</h1>
      <h2>Status: {status}</h2>
      <h3>Faces Detected: {count}</h3>

      <FaceDetector onFaceStatus={handleFaceStatus} videoRef={videoRef}/>
    </div>
  );
}
