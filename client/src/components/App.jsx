import "../styles/App.scss";
import ChannelList from "./ChannelList";
import FriendList from "./FriendList";
import Header from "./Header";
import MessageList from "./MessageList";
import RoomList from "./RoomList";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">App Goes Here!</header>
      <Header />
      <RoomList />
      <ChannelList />
      <MessageList />
      <FriendList />
    </div>
  );
};

export default App;
