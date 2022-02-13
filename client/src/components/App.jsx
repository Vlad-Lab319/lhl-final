import "../styles/App.scss";
// import ChannelList from "./ChannelList";
// import FriendList from "./FriendList";
import Header from "./Header";
// import MessageList from "./MessageList";
import RoomList from "./RoomList";
import WebRtc from "./WebRTC";

const App = () => {
  return (
    <main className="layout">
      <header className="header">
        <Header />
      </header>

      <div className="sidebar--rooms">
        <RoomList />
      </div>
      {/*
      <ChannelList />
      <MessageList />
      <FriendList /> */}
      <div className="webrtc">
        <WebRtc />

      </div>
    </main>
  );
};

export default App;
