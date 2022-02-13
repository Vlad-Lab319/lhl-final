import TextsmsIcon from "@mui/icons-material/Textsms";
import classNames from "classnames";
import "../styles/ChannelListItem.scss";

const ChannelListItem = (props) => {
  const { name, setChannel, selected, type } = props;

  const channelListClass = classNames(
    "channel-item",
    selected && "channel-item--selected"
  );

  const iconClass = classNames(
    "channel-icon",
    selected && "channel-icon--selected"
  );

  return (
    <div className={channelListClass} onClick={setChannel}>
      <div className={iconClass}>{type === "text" && <TextsmsIcon />}</div>
      <span>{name}</span>
    </div>
  );
};

export default ChannelListItem;
