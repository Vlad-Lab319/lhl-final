import { useCallback, useEffect, useState } from "react";
import { onCall } from "../../services/signaling";
import Meeting from "./Meeting";
import "./WebRTC.scss";

// dummy load
const currentUser = {
  id: `${+new Date()}`,
  name: "Emily",
};

const guestUser = {
  id: `${+new Date()}`,
  name: "Haris",
};

const WebRtc = (props) => {
  const { makeCall } = props;

  const [callContact, setCallContact] = useState();
  const [callerInfo, setCallerInfo] = useState();
  const [answerCallId, setAnswerCallId] = useState(null);

  useEffect(() => {
    if (callerInfo && callerInfo.caller.id !== currentUser.id) {
      setAnswerCallId(callerInfo.callId);
      setCallContact(callerInfo.caller);
    }
  }, [callerInfo]);

  useEffect(() => {
    onCall((callId, caller) => {
      setCallerInfo({
        callId,
        caller,
      });
    });
  }, []);

  const startMeeting = useCallback((contact) => {
    setCallContact(contact);
  }, []);

  const hangup = useCallback(() => {
    setCallContact(undefined);
  }, []);

  const closeButton = (
    <div className="stream-button" onClick={makeCall}>
      End meeting
    </div>
  );

  return (
    <div className="webrtc">
      <div className="webrtc-container">
        <h2>Video meeting</h2>
      </div>
      <div className="webrtc-buttons-container">
        {closeButton}

        {callContact ? (
          <Meeting
            answerCallId={answerCallId}
            hangup={hangup}
            contact={callContact}
            currentUser={currentUser}
          />
        ) : (
          <button
            className="stream-button"
            onClick={() => startMeeting(guestUser)}
          >
            Start stream
          </button>
        )}
      </div>
    </div>
  );
};

export default WebRtc;
