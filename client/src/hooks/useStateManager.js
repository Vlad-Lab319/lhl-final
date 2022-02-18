import { useReducer } from "react";

export default function useStateManager() {
  const reducerVariables = {
    SET_SOCKET: "SET_SOCKET",
    SET_USER: "SET_USER",
    SET_USERS: "SET_USERS",
    SET_ROOM: "SET_ROOM",
    SET_ROOMS: "SET_ROOMS",
    SET_CHANNEL: "SET_CHANNEL",
    SET_FRIENDS: "SET_FRIENDS",
    SET_RECIPIENT: "SET_RECIPIENT",
    ADD_MESSAGES: "ADD_MESSAGES",
    ADD_ROOMS: "ADD_ROOMS",
    ADD_CHANNELS: "ADD_CHANNELS",
    SET_APPLICATION_DATA: "SET_APPLICATION_DATA",
    SET_ERRORS: "SET_ERRORS",
  };

  const r = reducerVariables;

  const initialState = {
    user: null,
    users: {},
    socket: null,
    room: {},
    channel: {},
    rooms: [],
    channels: [],
    friends: [],
    recipient: {},
    members: [],
    messages: [],
    errors: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case r.SET_SOCKET:
        return {
          ...state,
          socket: action.value,
        };
      case r.SET_USER:
        return {
          ...state,
          user: action.value,
        };
      case r.SET_USERS:
        console.log(action.value);
        return {
          ...state,
          users: action.value,
        };
      case r.SET_ROOM:
        return {
          ...state,
          room: action.value,
        };
      case r.SET_ROOMS:
        return {
          ...state,
          rooms: action.value,
        };
      case r.SET_CHANNEL:
        return {
          ...state,
          channel: action.value,
        };
      case r.SET_FRIENDS:
        return {
          ...state,
          friends: action.value,
        };
      case r.SET_RECIPIENT:
        return {
          ...state,
          recipient: action.value,
        };
      case r.ADD_MESSAGES:
        return {
          ...state,
          messages: [...state.messages, action.value],
        };
      case r.ADD_ROOMS:
        return {
          ...state,
          rooms: [...state.rooms, action.value],
        };
      case r.ADD_CHANNELS:
        return {
          ...state,
          channels: [...state.channels, action.value],
        };
      case r.SET_APPLICATION_DATA:
        return {
          ...state,
          users: action.value.users,
          rooms: action.value.rooms,
          channels: action.value.channels,
          friends: action.value.friends,
          messages: action.value.messages,
        };
      case r.SET_ERRORS:
        return {
          ...state,
          errors: action.value,
        };
      default:
        return { ...state };
    }
  }

  return { state, dispatch, r };
}
