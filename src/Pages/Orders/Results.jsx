import { useState } from "react";
import {
  ChevronLeft as BackIcon,
  Search as SearchIcon,
} from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import SearchBar from "../../Components/SearchBar/SearchBar";
import OrderCard from "../../Components/OrderCard/OrderCard";

function Results({ history, location }) {
  const [searchQuery, setSearchQuery] = useState();
  const searchParams = new URLSearchParams(location.search);

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: "flex",
          alignItems: "center",
          padding: 13,
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
        <SearchBar onChange={(e) => setSearchQuery(e.target.value)} />
        <button
          type="submit"
          onClick={() => history.replace(`/orders/s?name=${searchQuery}`)}
          style={{
            marginLeft: 5,
            padding: 5,
            display: "grid",
            placeItems: "center",
            background: "transparent",
            border: "none",
          }}
        >
          <SearchIcon />
        </button>
      </form>

      <ul
        style={{
          listStyleType: "none",
          margin: 0,
          padding: 13,
          paddingTop: 10,
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        {[1, 2].map((num) => (
          <li>
            <OrderCard
              number="0003"
              date="Abril 5, 2020 - 19:32"
              status="En preparación"
              id={num}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
