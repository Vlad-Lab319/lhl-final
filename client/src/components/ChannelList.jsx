import "../styles/ChannelList.scss";
import ChannelListItem from "./ChannelListItem";
// TODO: ChannelList will render ChannelListItems for a room. ChannelListItems will take a single channel from the channelList. channelList is an array of objects containing a channel_id, channel_name

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
