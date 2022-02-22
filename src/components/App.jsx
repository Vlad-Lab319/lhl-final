//-------------------------------Helpers----------------------------------------
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";
import {
  attachUsersToMessages,
  getChannelsForRoom,
  getDirectMessages,
  getFilteredFriends,
  getMessagesForChannel,
  getMessagesForPrivateRoom,
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
import FindFriendList from "./User/FindFriendList";
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
    sendPrivateMessage,
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
    toggleDirectMessage,
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    setPrivateRoom,
    takeMeHome,
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
  const directMessageList = getDirectMessages(state);
  const messageListWithUsers = attachUsersToMessages(messageList, state);
  const memberList = getUsersForRoom(state.room, state);
  const privateMessageList = getMessagesForPrivateRoom(
    state.privateRoom,
    state
  );
  const privateMessageListWithUsers = attachUsersToMessages(
    privateMessageList,
    state
  );
  const remainingMemberList = getFilteredFriends(state);

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
                  takeMeHome={() => takeMeHome()}
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
                  directMessage={state.directMessage}
                  toggleDirectMessage={toggleDirectMessage}
                />
                {state.directMessage && (
                  <>
                    <FriendList
                      friendList={state.friends}
                      user={state.user}
                      directMessageList={directMessageList}
                      friendRequests={state.friendRequests}
                      cancelFriendRequest={cancelFriendRequest}
                      acceptFriendRequest={acceptFriendRequest}
                      setPrivateRoom={setPrivateRoom}
                    />
                    <FindFriendList
                      user={state.user}
                      sendFriendRequest={sendFriendRequest}
                    />
                    {state.privateRoom.id && (
                      <div className="messages">
                        <MessageList
                          messageList={privateMessageListWithUsers}
                          user={state.user}
                          isPrivate={true}
                          privateRoom={state.privateRoom}
                        />
                        <ChatInput
                          user={state.user}
                          sendPrivateMessage={sendPrivateMessage}
                          isPrivate={true}
                          privateRoom={state.privateRoom}
                        />
                      </div>
                    )}
                  </>
                )}
                {!state.directMessage && state.room.id && (
                  <>
                    <ChannelList
                      setChannel={setChannel}
                      channelList={channelList}
                      value={state.channel}
                      room={state.room}
                      user={state.user}
                      createChannel={createChannel}
                      remainingMemberList={remainingMemberList}
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
                {state.channel.id && (
                  <div className="messages">
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
                  </div>
                )}
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
