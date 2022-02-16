// Helpers
import {
  getChannelsForRoom,
  getMessagesForChannel,
  getDirectMessages
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
import DirectMessagesList from "./DirectMessagesList";
import RoomList from "./RoomList";
import FriendList from "./FriendList";
import RoomMembersList from "./RoomMembersList";

// TODO: Create a private chat Component, the friends list can replace the channels bar, and should we replace the RoomMembersList side bar with something else while in private chats?

// TODO: WebRTC needs to be integrated into the app, likely we'll need to put it in the private chat component
//TODO: div messages needs to be refactored as a separate component to handle different channel types

const App = () => {
  const { state, setChannel, setRoom, loginUser, sendMessage, setRecipient } =
    useApplicationData();
  const channelList = getChannelsForRoom(state.room, state);
  const messageList = getMessagesForChannel(state.channel, state);
  const directMessagesList = getDirectMessages(state);

  //dummy friends
  const friendList = [
    {
      "id": 1,
      "username": "Alice",
      "avatar_url": "https://i.pinimg.com/736x/f5/23/3a/f5233afc4af9c7be02cc1c673c7c93e9.jpg"
    },
    {
      "id": 2,
      "username": "Kira",
      "avatar_url": "https://i.pinimg.com/736x/f5/23/3a/f5233afc4af9c7be02cc1c673c7c93e9.jpg"
    }
  ];

  const memberList = [];
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
          {/* <FriendList
            friendList={friendList}
            value={state.recipient.id}
            setRecipient={setRecipient}
          /> */}
          <div className="messages">
            {state.channel.id && (
              <>
                <MessageList
                  messageList={messageList}
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
      ) : (
        <div className="main-container">
          <Login loginUser={loginUser} />
        </div>
      )}
    </main>
  );
};

export default App;
