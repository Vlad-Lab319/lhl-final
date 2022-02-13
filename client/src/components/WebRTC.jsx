import firebase from "firebase/app";
import "firebase/firestore";
import { useRef, useState } from "react";

const WebRtc = (props) => {
  const {} = props;

  const [meetingId, setOffer] = useState("waiting...");
  const [input, setInput] = useState("");

  const webCam = useRef();
  const remoteCam = useRef();

  const firebaseConfig = {
    // Firebase stuff goes here
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const firestore = firebase.firestore();

  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  const pc = new RTCPeerConnection(servers);
  let localStream = null;
  let remoteStream = null;

  // Setup media sources

  function getLocalStream() {
    console.log("WebCam");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStream = stream;
        remoteStream = new MediaStream();
        console.log("streaming");

        // Push tracks from local stream to peer connection
        localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream);
        });

        // Pull tracks from remote stream, add to video stream
        pc.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
          });
        };

        webCam.current.srcObject = localStream;
        remoteCam.current.srcObject = remoteStream;
      })
      .catch((err) => console.log(err));
  }

  // Create an offer

  async function startMeeting() {
    console.log("Meeting");

    // Reference Firestore collections for signaling
    const callDoc = firestore.collection("calls").doc();
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    // callInput.value = callDoc.id;
    console.log(callDoc.id);
    setOffer(callDoc.id);

    // Get candidates for caller, save to db
    pc.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    // Create offer
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

    // Listen for remote answer
    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    // When answered, add candidate to peer connection
    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  }

  // 3. Answer the call with the unique ID

  async function joinMeeting() {
    const callId = input;

    const callDoc = firestore.collection("calls").doc(callId);
    const answerCandidates = callDoc.collection("answerCandidates");
    const offerCandidates = callDoc.collection("offerCandidates");

    pc.onicecandidate = (event) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    const callData = (await callDoc.get()).data();

    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await callDoc.update({ answer });

    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log(change);
        if (change.type === "added") {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  }

  // function hangup() {

  //   pc.close();
  // }

  return (
    <div>
      <div className="container">
        <div>WebRTC</div>
        <div className="videos">
          <span>
            <h3>Local Stream</h3>
            <video autoPlay playsInline ref={webCam}></video>
          </span>
          <span>
            <h3>Remote Stream</h3>
            <video autoPlay playsInline ref={remoteCam}></video>
          </span>
        </div>
      </div>
      <div className="container">
        <button onClick={getLocalStream}>Start stream</button>
        <button onClick={startMeeting}>Host meeting</button>
        <span>{meetingId}</span>
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <input
            className=""
            name="offer"
            type="text"
            placeholder="Put meeting ID here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
        <button onClick={joinMeeting}>Join meeting</button>
        {/* <button onClick={hangup}>Hangup</button> */}
      </div>
    </div>
  );
};

export default WebRtc;
