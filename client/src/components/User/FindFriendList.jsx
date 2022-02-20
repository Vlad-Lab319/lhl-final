import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import "./FindFriendList.scss";
import FindFriendListItem from "./FindFriendListItem";

const FindFriendList = (props) => {
  const { user } = props;
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchValue.length) {
      axios.get(`api/users/search/${searchValue}/${user.id}`).then((res) => {
        console.log(res.data);
        setSearchResults(res.data);
      });
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);

  const findFriendList = searchResults.map((user) => {
    console.log(user);
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
            autoComplete="off"
          />
        </Box>
        <div className="member-separator"></div>
        {findFriendList}
      </div>
    </div>
  );
};

export default FindFriendList;
