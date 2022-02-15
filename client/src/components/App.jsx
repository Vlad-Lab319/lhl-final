// Helpers
import {
  getChannelsForRoom,
  getMessagesForChannel,
} from "../helpers/selectors";
// State
import useApplicationData from "../hooks/useApplicationData";
// Styles - scss
import "../styles/App.scss";
import ChannelList from "./ChannelList";
import ChatInput from "./ChatInput";
import Header from "./Header";
import Login from "./Login";
import MessageList from "./MessageList";
import RoomList from "./RoomList";
import RoomMembersList from "./RoomMembersList";

// TODO: setUser needs to be passed to the header and login needs to be implemented, for now the user is hardcoded in state "../hooks/useApplicationData"

// TODO: Create a private chat Component, the friends list can replace the channels bar, and should we replace the RoomMembersList side bar with something else while in private chats?

// TODO: WebRTC needs to be integrated into the app, likely we'll need to put it in the private chat component

const App = () => {
  const { state, setChannel, setRoom, loginUser } = useApplicationData();
  const channelList = getChannelsForRoom(state.room, state);
  const messageList = getMessagesForChannel(state.channel, state);
  const memberList = [];
  // const user = setUser;
  return (
    <main className="layout">
      <header className="header">
        <Header />
      </header>
      {state.user ? (
        <div className="main-container">
          <RoomList
            setRoom={setRoom}
            roomList={state.rooms}
            value={state.room}
          />
          <ChannelList
            setChannel={setChannel}
            channelList={channelList}
            value={state.channel}
            room={state.room}
          />
          <div className="messages">
            <MessageList messageList={messageList} channel={state.channel} />
            <ChatInput />
          </div>
          <div className="sidebar sidebar--friends">
            {/* <FriendList /> */}
            <RoomMembersList memberList={memberList} />
          </div>
          {/* <div className="webrtc">
            <WebRtc />
          </div> */}
        </div>
      ) : (
        <div className="main-container">
          <Login loginUser={loginUser} />{" "}
        </div>
      )}
    </main>
  );
};

export default App;
