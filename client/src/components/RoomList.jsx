import "../styles/RoomList.scss";
import RoomListItem from "./RoomListItem";

const RoomList = (props) => {
  const { roomList, setRoom, value } = props;
  const rooms = roomList.map((room) => {
    return (
      <RoomListItem
        key={room.id}
        id={room.id}
        name={room.name}
        icon={room.icon_url}
        setRoom={() => setRoom(room)}
        selected={room.id === value.id}
      />
    );
  });

  return <div className="sidebar sidebar--rooms">{rooms}</div>;
};

export default RoomList;
