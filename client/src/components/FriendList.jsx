import classNames from "classnames";
import "../styles/FriendList.scss";
// import FriendListItem from "./FriendListItem";
// TODO:

const FriendList = (props) => {
  const { friendList } = props;
  const friendClass = classNames();
  // const friends = friendList.map((friend) => {
  //   return <FriendListItem />;
  // });
  return (
    <>
      <div>Friend</div>
    </>
  );
};

export default FriendList;
