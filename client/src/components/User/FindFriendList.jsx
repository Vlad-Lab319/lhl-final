import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import "./FindFriendList.scss";
import FindFriendListItem from "./FindFriendListItem";

// Input component that sends a get request onChange

const FindFriendList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get(`api/users/search/${searchValue}`).then((res) => {
      setSearchResults(res);
    });
  }, [searchValue]);

  const userList = searchResults;

  const findFriendList = userList.map((user) => {
    return (
      <FindFriendListItem key={user.id} name={user.name} avatar={user.avatar} />
    );
  });
  return (
    <div className="sidebar sidebar--find-friend">
      <div className="find-friend-list">
        <Box
          // sx={{ display: "flex", alignItems: "flex-end" }}
          className="find-friend-list-title"
        >
          <AccountCircle className="find-friend-list-title-icon" />
          <TextField
            id="input-with-sx"
            placeholder="Find new friends..."
            variant="standard"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Box>
        {userList.length > 0 && <div className="member-separator"></div>}
        {findFriendList}
      </div>
    </div>
  );
};

export default FindFriendList;
