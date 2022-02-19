import { useRef, useState, useEffect, useCallback } from "react";
import { useCallStream } from "../../hooks/useCallStream";
import { useCallTimer } from "../../hooks/useCallTimer";
import "./WebRTC.scss";

const CALLING = "CALLING";
const ANSWERED = "ANSWERED";
const CONNECTING = "CONNECTING";

const Meeting = (props) => {
  const { hangup, contact, answerCallId, currentUser } = props;


  const [callStatus, setCallStatus] = useState(CONNECTING);
  const [answeredStream, setAnsweredStream] = useState();

  const webCam = useRef();
  const remoteCam = useRef();

  const { callTimer, startTimer, stopTimer } = useCallTimer();

  const {
    onLocalStreamCreated,
    onRemoteStreamCreated,
    onDisconnect,
    answerCall,
  } = useCallStream(currentUser, answerCallId);

  useEffect(() => {
    const unsubscribe = onLocalStreamCreated((localStream) => {
      webCam.current.srcObject = localStream;
      setCallStatus(CALLING);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onRemoteStreamCreated((localStream) => {
      setAnsweredStream(localStream);
      setCallStatus(ANSWERED);
      startTimer();
    });

    return () => {
      unsubscribe();
    };
  }, [startTimer]);

  useEffect(() => {
    const unsubscribe = onDisconnect(() => {
      hangup();
    });

    return () => {
      unsubscribe();
    };
  }, [hangup]);

  useEffect(() => {
    if (answeredStream && remoteCam.current) {
      remoteCam.current.srcObject = answeredStream;
    }
  }, [answeredStream]);

  useEffect(() => {
    if (callStatus === ANSWERED) {
      startTimer();
    }

    return () => {
      stopTimer();
    };
  }, [callStatus]);

  const joinMeeting = useCallback((answerCallId) => {
    answerCall(answerCallId);
    setCallStatus(ANSWERED);
  }, []);


  return (
    <div className="webrtc" draggable={true}>
      <div className="webrtc-container">
        <div className="videos">
          <span>
            <h3>Host Stream</h3>
            <video autoPlay playsInline ref={webCam} muted={true} controls></video>
          </span>
          <span>
            <h3>Guest Stream</h3>
            <video autoPlay playsInline ref={remoteCam} controls></video>
          </span>
        </div>
      </div>
      <div className="webrtc-buttons-container">
        {
          callStatus === CALLING && answerCallId && (
            <button
              className="stream-button"
              onClick={() => joinMeeting(answerCallId)}
            >
              Join meeting
            </button>
          )}
        <span className="call--overlay--header--status">
          {callStatus === CALLING
            ? `Waiting for ${contact.name}`
            : callStatus === CONNECTING
              ? "Connecting..."
              : callTimer}
        </span>
        <button
          className="stream-button"
          onClick={hangup}
        >
          Hangup
        </button>
      </div>
    </div>
  );
};

export default Meeting;