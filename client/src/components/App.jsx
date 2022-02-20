//-------------------------------Helpers----------------------------------------
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";
import {
  attachUsersToMessages,
  getChannelsForRoom,
  getDirectMessages,
  getMessagesForChannel,
  getUsersForRoom,
} from "../helpers/selectors";
//-------------------------------State------------------------------------------
import useApplicationData from "../hooks/useApplicationData";
//-------------------------------Styles-----------------------------------------
import "./App.scss";
//-----------------------------Components---------------------------------------
import ChannelList from "./Channel/ChannelList";
import Header from "./Login/Header";
import UserForm from "./Login/index";
import ChatInput from "./Message/ChatInput";
import MessageList from "./Message/MessageList";
import RoomList from "./Room/RoomList";
import FriendList from "./User/FriendList";
import RoomMembersList from "./User/RoomMembersList";
//-------------------------------Theme------------------------------------------
const ColorModeContext = createContext({ toggleColorMode: () => {} });
//-------------------------------Main-------------------------------------------
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
    editRoom,
    editChannel,
    deleteRoom,
    deleteChannel,
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

  const [directMessage, setDirectMessage] = useState(false);

  const toggleDirectMessage = () => {
    setDirectMessage(!directMessage);
    setRoom({}, {}, state.user);
    setChannel({}, {}, state.user);
  };

  const channelList = getChannelsForRoom(state.room, state);
  const messageList = getMessagesForChannel(state.channel, state);
  const directMessageList = getDirectMessages(state);
  const messageListWithUsers = attachUsersToMessages(messageList, state);
  const memberList = getUsersForRoom(state.room, state);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <main className="layout">
          {state.user.id ? (
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
                  user={state.user}
                  channel={state.channel}
                  directMessage={directMessage}
                  toggleDirectMessage={() => toggleDirectMessage()}
                />
                {directMessage && (
                  <>
                    <FriendList
                      friendList={state.friends}
                      user={state.user}
                      directMessageList={directMessageList}
                    />
                  </>
                )}
                {!directMessage && (
                  <>
                    <ChannelList
                      setChannel={setChannel}
                      channelList={channelList}
                      value={state.channel}
                      room={state.room}
                      user={state.user}
                      createChannel={createChannel}
                      friends={state.friends}
                      addUserToRoom={addUserToRoom}
                      editRoom={editRoom}
                      editChannel={editChannel}
                      deleteRoom={deleteRoom}
                      deleteChannel={deleteChannel}
                    />

                    <RoomMembersList
                      memberList={memberList}
                      activeUser={state.user}
                      room={state.room}
                    />
                  </>
                )}
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
                </div>
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
