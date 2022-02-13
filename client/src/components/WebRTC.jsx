import { useRef, useEffect } from "react";
// TODO:

const WebRtc = (props) => {
  const { } = props;
  const webCam = useRef();

  let localStream = null;

  function getLocalStream() {
    console.log('Click');
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        localStream = stream;
        console.log('streaming');
        webCam.current.srcObject = localStream;
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="container">
      WebRTC
      <span>
        <h3>Local Stream</h3>
        <video id="webcamVideo" autoPlay playsInline ref={webCam}></video>
      </span>
      <button id="webcamButton" onClick={getLocalStream}>Start stream</button>

    </div>
  );
};

export default WebRtc;