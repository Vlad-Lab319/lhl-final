import { useCallback, useEffect, useRef } from "react";
import {
  addAnswerDescription,
  addICEAnswerCandidates,
  addICEOfferCandidates,
  addOfferDescription,
  fetchOfferDescription,
  onAnswer,
  onAnswerDescription,
  onOffer,
} from "../services/signaling";
import { createObserver } from "../services/observer";

const ICE_SERVERS = [
  "stun:stun1.l.google.com:19302",
  "stun:stun2.l.google.com:19302",
];

export function useCallStream(currentUser, isCaller) {
  const localStream = useRef(null);
  const peerConnection = useRef(null);
  const onLocalStreamCreated = createObserver();
  const onRemoteStreamCreated = createObserver();
  const onDisconnect = createObserver();

  const offer = useCallback(async () => {
    const callId = await createOffer(currentUser, peerConnection.current);
    watchAnswer(callId, peerConnection.current, () => {
      const remoteStream = createRemoteStream(peerConnection.current);
      onRemoteStreamCreated.publish(remoteStream);
    });
  }, []);

  const answer = useCallback((answerCallId) => {
    createAnswer(answerCallId, peerConnection.current);
    watchOffer(answerCallId, peerConnection.current, () => {
      const remoteStream = createRemoteStream(peerConnection.current);
      onRemoteStreamCreated.publish(remoteStream);
    });
  }, []);

  const bootstrap = useCallback(async () => {
    peerConnection.current = createPeerConnection();
    peerConnection.current.onconnectionstatechange = (event) => {
      switch (peerConnection.current.connectionState) {
        case "closed":
        case "disconnected":
        case "failed": {
          onDisconnect.publish(true);
          break;
        }
        default:
          break;
      }
    };

    const newLocalStream = await createLocalStream(peerConnection.current);
    localStream.current = newLocalStream;
    onLocalStreamCreated.publish(newLocalStream);

    if (!isCaller) {
      offer();
    }
  }, []);

  const stop = useCallback(() => {
    if (localStream.current) {
      stopMediaStream(localStream.current);
    }

    if (peerConnection.current) {
      peerConnection.current.close();
    }
  }, []);

  useEffect(() => {
    bootstrap();

    return () => {
      stop();
    };
  }, []);

  return {
    answerCall: answer,
    onLocalStreamCreated: onLocalStreamCreated.subscribe,
    onRemoteStreamCreated: onRemoteStreamCreated.subscribe,
    onDisconnect: onDisconnect.subscribe,
  };
}

// Create answer 

async function createAnswer(callId, pc) {
  registerICEAnswerCandidates(callId, pc);
  const offer = await fetchOfferDescription(callId);

  await pc.setRemoteDescription(new RTCSessionDescription(offer));

  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);

  const answer = {
    sdp: answerDescription.sdp,
    type: answerDescription.type,
  };

  addAnswerDescription(callId, answer);
}

// Watch for offer

function watchOffer(callId, pc, callback) {
  callback();
  onOffer(callId, (iceCandidateInit) => {
    pc.addIceCandidate(new RTCIceCandidate(iceCandidateInit));
  });
}

// Watch for answer 

function watchAnswer(callId, pc, callback) {
  onAnswerDescription(callId, (description) => {
    callback();
    pc.setRemoteDescription(new RTCSessionDescription(description));
  });

  // When answered, add candidate to peer connection
  onAnswer(callId, (iceCandidateInit) => {
    pc.addIceCandidate(new RTCIceCandidate(iceCandidateInit));
  });
}

// Create offer 

async function createOffer(caller, pc) {
  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };

  const callId = await addOfferDescription(offer, caller);

  registerICEOfferCandidates(callId, pc);

  return callId;
}


//  Get candidates for guest caller, save to db

function registerICEAnswerCandidates(callId, pc) {
  pc.addEventListener("icecandidate", (event) => {
    if (event.candidate) {
      addICEAnswerCandidates(callId, event.candidate);
    }
  });
}


// Get candidates for host caller, save to db

function registerICEOfferCandidates(callId, pc) {
  pc.addEventListener("icecandidate", (event) => {
    if (event.candidate) {
      addICEOfferCandidates(callId, event.candidate);
    }
  });
}

// Create connection

function createPeerConnection() {
  const servers = {
    iceServers: [
      {
        urls: ICE_SERVERS,
      },
    ],
    iceCandidatePoolSize: 10,
  };

  return new RTCPeerConnection(servers);
}

// Create local stream

async function createLocalStream(pc) {
  // const localStream =[]; // dummy stream;
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  // Push tracks from Local stream to peer connection
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });


  return localStream;
}

// Create remote stream

function createRemoteStream(pc) {
  const remoteStream = new MediaStream();

  // Pull tracks from Remote stream, add to video stream
  pc.addEventListener("track", (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  });

  return remoteStream;
}

// Stop streaming

function stopMediaStream(mediaStream) {
  mediaStream.getTracks().forEach((track) => {
    track.stop();
  });
}