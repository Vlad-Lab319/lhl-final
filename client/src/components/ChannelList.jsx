import "../styles/ChannelList.scss";
// import ChannelListItem from "./ChannelListItem";

// TODO: ChannelList will render ChannelListItems for a room. ChannelListItems will take a single channel from the channelList. channelList is an array of objects containing a channel_id, channel_name

// TODO: Channel needs a type value in db (text, audio/video)

const ChannelList = (props) => {
  const { channelList } = props;

  // const channels = channelList.map((channel) => {
  //   return (
  //     <ChannelListItem key={channel.id} id={channel.id} name={channel.name} />
  //   );
  // });

  return (
    <>
      <h3 className="channel-title">Channels</h3>
      {/* {channels} */}
      <div className="channel-item">
        <div className="channel-icon">#</div>
        <span>Channel 1</span>
      </div>
      <div className="channel-item">
        <div className="channel-icon">#</div>
        <span>Channel 2</span>
      </div>
      <div className="channel-item">
        <div className="channel-icon">#</div>
        <span>Channel 3</span>
      </div>
      <div className="channel-item">
        <div className="channel-icon">#</div>
        <span>Channel 4</span>
      </div>
      <div className="channel-item">
        <div className="channel-icon">#</div>
        <span>Channel 5</span>
      </div>
    </>
  );
};

export default ChannelList;
