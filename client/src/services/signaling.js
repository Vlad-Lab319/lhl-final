import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAJ8IqOFiPI2duV_wvRv0oVTL9a6SMs31U",
  authDomain: "webrtc-lhl-final.firebaseapp.com",
  projectId: "webrtc-lhl-final",
  storageBucket: "webrtc-lhl-final.appspot.com",
  messagingSenderId: "860225798938",
  appId: "1:860225798938:web:78fd53032b7826583da2a3"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

export function addICEOfferCandidates(callId, candidate) {
  const offerCandidates = firestore.collection(
    `calls/${callId}/offerCandidates`
  );
  offerCandidates.add(candidate.toJSON());
}

export function addICEAnswerCandidates(callId, candidate) {
  const answerCandidates = firestore.collection(
    `calls/${callId}/answerCandidates`
  );
  answerCandidates.add(candidate.toJSON());
}

export async function addOfferDescription(offer, caller) {
  const callDoc = firestore.collection("calls").doc();
  callDoc.set({ offer, caller });

  return callDoc.id;
}

export async function addAnswerDescription(callId, answer) {
  const callDoc = firestore.collection("calls").doc(callId);
  return callDoc.update({ answer });
}

export async function fetchOfferDescription(callId) {
  const callDoc = firestore.collection("calls").doc(callId);

  return (await callDoc.get()).data().offer;
}

export function onAnswerDescription(callId, callback) {
  const callDoc = firestore.collection("calls").doc(callId);
  callDoc.onSnapshot((snapshot) => {
    const data = snapshot.data();

    if (data.answer) {
      callback(data.answer);
    }
  });
}

export function onAnswer(callId, callback) {
  const answerCandidates = firestore.collection(
    `calls/${callId}/answerCandidates`
  );
  answerCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        callback(change.doc.data());
      }
    });
  });
}

export function onOffer(callId, callback) {
  const answerCandidates = firestore.collection(
    `calls/${callId}/offerCandidates`
  );
  answerCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        callback(change.doc.data());
      }
    });
  });
}

export function onCall(callback) {
  const calls = firestore.collection("calls");
  calls.onSnapshot((snapshot) => {
    const changes = snapshot.docChanges();

    if (changes.length === 1) {
      const change = changes[0];
      const caller = change.doc.data().caller;
      callback(change.doc.id, caller);
    }
  });
}
