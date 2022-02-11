import "../styles/ChannelListItem.scss";
import ChannelListItem from "./ChannelListItem";

// TODO: ChannelList will render ChannelListItems for a room. ChannelListItems will take a single channel from the channelList. channelList is an array of objects containing a channel_id, channel_name

// TODO: Channel needs a type value in db (text, audio/video)

const ChannelList = (props) => {
  const { channelList } = props;

  const channels = channelList.map((channel) => {
    return (
      <ChannelListItem key={channel.id} id={channel.id} name={channel.name} />
    );
  });

  return (
    <div>
      Channels
      {channels}
    </div>
  );
};

export default ChannelList;
