// Helpers
import { getChannelsForRoom } from "../helpers/selectors";
// State
import useApplicationData from "../hooks/useApplicationData";
// Styles - scss
import "../styles/App.scss";
import ChannelList from "./ChannelList";
import ChatInput from "./ChatInput";
import FriendList from "./FriendList";
import Header from "./Header";
import RoomList from "./RoomList";

const App = () => {
  const { state, setChannel, setRoom, setUser } = useApplicationData();
  const channelList = getChannelsForRoom(state.room, state);
  // const messageList = getMessagesForChannel(state.channel, state);
  // const user = setUser;
  return (
    <main className="layout">
      <header className="header">
        {/* TODO: Login in the header */}
        <Header />
      </header>
      <div className="main-container">
        <RoomList setRoom={setRoom} roomList={state.rooms} value={state.room} />
        <ChannelList
          setChannel={setChannel}
          channelList={channelList}
          value={state.channel}
        />
        <div className="messages">
          {/* <MessageList messageList={messageList} /> */}
          <ChatInput />
        </div>
        <div className="sidebar sidebar--friends">
          <FriendList />
        </div>
        {/* <div className="webrtc">
          <WebRtc />
        </div> */}
      </div>
    </main>
  );
};

export default App;
