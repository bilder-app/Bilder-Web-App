import { useRef, useEffect, useState } from "react";
import SearchBar from "../../Components/SearchBar/SearchBar";
import {
  ChevronLeft as BackIcon,
  QueryBuilder as ClockIcon,
  CallMade as SearchRecentIcon,
  Search as SearchIcon,
} from "@material-ui/icons";
import { Typography, ButtonBase } from "@material-ui/core";

const Recent = ({ title, onTextSelect, onSearch }) => {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <ButtonBase
        onClick={onTextSelect}
        style={{
          display: "flex",
          gap: 10,
          padding: 5,
          flexGrow: 2,
          justifyContent: "flex-start",
          paddingLeft: 10,
        }}
      >
        <ClockIcon />
        <Typography>{title}</Typography>
      </ButtonBase>
      <div
        style={{
          width: "15%",
          display: "grid",
          placeItems: "center",
        }}
        onClick={onSearch}
      >
        <SearchRecentIcon />
      </div>
    </li>
  );
};

function Search({ history }) {
  const focusRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    focusRef.current.focus();
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: 10,
        }}
      >
        <BackIcon
          onClick={() => history.goBack()}
          style={{
            width: 30,
            height: 30,
            padding: 0,
            marginRight: 6,
          }}
        />
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          ref={focusRef}
        />
        <div
          onClick={() => history.push(`/orders/s?name=${searchQuery}`)}
          style={{
            marginLeft: 5,
            padding: 5,
            display: "grid",
            placeItems: "center",
          }}
        >
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}

export default Search;
