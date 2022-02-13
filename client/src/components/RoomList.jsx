import "../styles/RoomList.scss";
import RoomListItem from "./RoomListItem";

// RoomList renders individual room icons and has a 'home' icon as a header. Roomlist takes in an array of room objects from the db filtered by user_id

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
