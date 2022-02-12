import classNames from "classnames";
import "../styles/RoomList.scss";
import RoomListItem from "./RoomListItem";

// TODO: RoomList renders individual room icons and has a 'home' icon as a header. Roomlist takes in an array of room objects from the db filtered by user_id

const RoomList = (props) => {
  const { roomList } = props;
  const roomClass = classNames();
  const rooms = roomList.map((room) => {
    return <RoomListItem />;
  });
  return { rooms };
};

export default RoomList;
