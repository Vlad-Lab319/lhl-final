// Helpers
import {
  attachUsersToMessages,
  getChannelsForRoom,
  getDirectMessages,
  getMessagesForChannel,
} from "../helpers/selectors";
// State
import useApplicationData from "../hooks/useApplicationData";
import "./App.scss";
import ChannelList from "./Channel/ChannelList";
import Header from "./Login/Header";
import UserForm from "./Login/index";
import ChatInput from "./Message/ChatInput";
import MessageList from "./Message/MessageList";
import RoomList from "./Room/RoomList";
import RoomMembersList from "./User/RoomMembersList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";

// TODO: Create a private chat Component, the friends list can replace the channels bar, and should we replace the RoomMembersList side bar with something else while in private chats?
// TODO: WebRTC needs to be integrated into the app, likely we'll need to put it in the private chat component
//TODO: div messages needs to be refactored as a separate component to handle different channel types

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = () => {
  const {
    state,
    setChannel,
    setRoom,
    loginUser,
    logoutUser,
    sendMessage,
    setRecipient,
    registerUser,
    createRoom,
    createChannel,
    clearErrors,
    addUserToRoom,
  } = useApplicationData();

  // theme stuff
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#af6fcd",
          },
        },
      }),
    [mode]
  );

  const channelList = getChannelsForRoom(state.room, state);
  const messageList = getMessagesForChannel(state.channel, state);
  const directMessagesList = getDirectMessages(state);
  const messageListWithUsers = attachUsersToMessages(messageList, state);
  const memberList = [];

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <main className="layout">
          {state.user ? (
            <>
              <header className="header">
                <Header
                  user={state.user}
                  logoutUser={() => logoutUser()}
                  toggle={colorMode.toggleColorMode}
                  theme={theme}
                />
              </header>
              <div className="main-container">
                <RoomList
                  setRoom={setRoom}
                  roomList={state.rooms}
                  value={state.room}
                  createRoom={createRoom}
                  userID={state.user.id}
                />
                <ChannelList
                  setChannel={setChannel}
                  channelList={channelList}
                  value={state.channel}
                  room={state.room}
                  createChannel={createChannel}
                  friends={state.friends}
                  addUserToRoom={addUserToRoom}
                />

                {/* <FriendList



          <div className="main-container">
            <RoomList
              setRoom={setRoom}
              roomList={state.rooms}
              value={state.room}
              createRoom={createRoom}
              userID={state.user.id}
            />
            <ChannelList
              setChannel={setChannel}
              channelList={channelList}
              value={state.channel}
              room={state.room}
            />
            {/* <FriendList
            friendList={friendList}
            value={state.recipient.id}
            setRecipient={setRecipient}
          /> */}
                <div className="messages">
                  {state.channel.id && (
                    <>
                      <MessageList
                        messageList={messageListWithUsers}
                        channel={state.channel}
                        user={state.user}
                      />
                      <ChatInput
                        channel={state.channel}
                        user={state.user}
                        sendMessage={sendMessage}
                      />
                    </>
                  )}

                  {/* <>
              <DirectMessagesList messageList={directMessagesList}

              />
              <ChatInput
              channel={null}
              user={state.user}
              recipient={state.recipient}
              sendMessage={sendMessage}
              />

            </> */}
                </div>
                <div className="sidebar sidebar--friends">
                  <RoomMembersList memberList={memberList} />
                </div>
                {/* <div className="webrtc">
            <WebRtc />
          </div> */}
              </div>
            </>
          ) : (
            <div className="main-container">
              <UserForm
                loginUser={loginUser}
                registerUser={registerUser}
                errors={state.errors}
                clearErrors={() => clearErrors()}
              />
            </div>
          )}
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
