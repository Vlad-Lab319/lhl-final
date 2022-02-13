// Helpers
import {
  getChannelsForRoom,
  getMessagesForChannel,
} from "../helpers/selectors";
// State
import useApplicationData from "../hooks/useApplicationData";
// Styles - scss
import "../styles/App.scss";
// Components
import ChannelList from "./ChannelList";
import ChatInput from "./ChatInput";
import FriendList from "./FriendList";
import Header from "./Header";
import MessageList from "./MessageList";
import RoomList from "./RoomList";

const App = () => {
  const { state, setChannel, setRoom, setUser } = useApplicationData();
  const channelList = getChannelsForRoom(state.room, state);
  const messageList = getMessagesForChannel(state.channel, state);
  // const user = setUser;
  return (
    <main className="layout">
      <header className="header">
        {/* TODO: Login in the header */}
        <Header />
      </header>
      <div className="main-container">
        <div className="sidebar sidebar--rooms">
          <RoomList setRoom={setRoom} />
        </div>

        <div className="sidebar sidebar--channels">
          <ChannelList setChannel={setChannel} channelList={channelList} />
        </div>
        <div className="messages">
          <MessageList messageList={messageList} />
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
