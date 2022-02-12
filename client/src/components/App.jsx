import "../styles/App.scss";
import ChannelList from "./ChannelList";
import ChatInput from "./ChatInput";
import FriendList from "./FriendList";
import Header from "./Header";
import MessageList from "./MessageList";
import RoomList from "./RoomList";
const App = () => {
  return (
    <main className="layout">
      <header className="header">
        <Header />
      </header>
      <div className="main-container">
        <div className="sidebar sidebar--rooms">
          <RoomList />
        </div>

        <div className="sidebar sidebar--channels">
          <ChannelList />
        </div>
        <div className="messages">
          <MessageList />
          <ChatInput />
        </div>
        <div className="sidebar sidebar--friends">
          <FriendList />
        </div>
        {/*
      <ChannelList />
    <FriendList /> */}
      </div>
    </main>
  );
};

export default App;
