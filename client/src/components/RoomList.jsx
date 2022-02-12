import "../styles/RoomList.scss";

// TODO: RoomList renders individual room icons and has a 'home' icon as a header. Roomlist takes in an array of room objects from the db filtered by user_id

const RoomList = (props) => {
  // const { roomList } = props;
  // const roomClass = classNames();
  // const rooms = roomList.map((room) => {
  //   return <RoomListItem />;
  // });

  return (
    <>
      <div className="room">ROOM</div>
      <div className="room">ROOM</div>
      <div className="room">ROOM</div>
      <div className="room">ROOM</div>
      <div className="room">ROOM</div>
    </>
  );
};

export default RoomList;
