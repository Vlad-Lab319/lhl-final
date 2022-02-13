import "../styles/ChannelList.scss";
import ChannelListItem from "./ChannelListItem";

const ChannelList = (props) => {
  const { channelList, setChannel, value, room } = props;

  const channels = channelList.map((channel) => {
    return (
      <ChannelListItem
        key={channel.id}
        name={channel.name}
        setChannel={() => setChannel(channel)}
        selected={channel.id === value.id}
        type={channel.type}
      />
    );
  });

  return (
    <div className="sidebar sidebar--channels">
      <h3 className="channel-title">
        {room.name && `Channels - ${room.name}`}
      </h3>
      {channels}
    </div>
  );
};

export default ChannelList;
