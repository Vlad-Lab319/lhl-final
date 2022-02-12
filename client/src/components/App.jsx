import "../styles/App.scss";
// import ChannelList from "./ChannelList";
// import FriendList from "./FriendList";
import Header from "./Header";
// import MessageList from "./MessageList";
import RoomList from "./RoomList";

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
    </main>
  );
};

export default App;
