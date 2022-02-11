import classNames from "classnames";
import "../styles/FriendListItem.scss";
import FriendListItem from "./FriendListItem";
// TODO:

const FriendList = (props) => {
  const { friendList } = props;
  const friendClass = classNames();
  const friends = friendList.map((friend) => {
    return <FriendListItem />;
  });
  return {
    friends,
  };
};

export default FriendList;
