import React, { useEffect, useState } from "react";
import {
  ChevronLeft as BackIcon,
  Search as SearchIcon,
} from "@material-ui/icons";
import SearchBar from "../../Components/SearchBar/SearchBar";
import OrderCard from "../../Components/OrderCard/OrderCard";
import { getOrderById } from "../../api"

function Results({ history, location }) {
  const [searchQuery, setSearchQuery] = useState();
  const searchParams = new URLSearchParams(location.search);

  const [render, toRender] = useState();

  useEffect(() => {
    async function handleAsync() {
      const refresh = await getOrderById(searchParams.get("number"));
      console.log(refresh)
      toRender(refresh);
    }
    handleAsync()
  }, [searchParams.get("number")])
  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
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
        <SearchBar onChange={(e) => setSearchQuery(e.target.value)} />
        <button
          type="submit"
          onClick={() => history.replace(`/orders/s?number=${searchQuery}`)}
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
          padding: 20,
          paddingTop: 10,
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        {render && 
          (<li>
            <OrderCard data={render} />
          </li>)
        }
      </ul>
    </div>
  );
}

export default Results;
