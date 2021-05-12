import { useState } from "react";
import {
  ChevronLeft as BackIcon,
  Search as SearchIcon,
} from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import SearchBar from "../../Components/SearchBar/SearchBar";
import ProductCard from "../../Components/ProductCard/ProductCard";

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
          onClick={() => history.replace(`/products/s?name=${searchQuery}`)}
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

      <Typography style={{ marginLeft: 13 }} variant="h6">
        {searchParams.get("name").length} resultados para "
        {searchParams.get("name")}"
      </Typography>

      <ul
        style={{
          listStyleType: "none",
          margin: 0,
          padding: 10,
          paddingTop: 10,
          display: "grid",
          flexDirection: "column",
          gap: 15,
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 2fr))",
        }}
      >
        <li>
          <ProductCard
            price={1200}
            description="Hierro estructural 20&nbsp;x&nbsp;20, espesor 1,2mm"
            imageUrl={"https://source.unsplash.com/500x500/?hammer"}
            stock={15}
          />
        </li>
        <li>
          <ProductCard
            price={1000}
            description="Latex Interior Albalatex Ultra Lavable Blanco "
            imageUrl={"https://source.unsplash.com/500x500/?tool,paint"}
            stock={250}
          />
        </li>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <li key={num}>
            <ProductCard
              price={1250 * num}
              description="Latex Interior Albalatex Ultra Lavable Blanco "
              imageUrl={`https://source.unsplash.com/500x500/?tool,${num}`}
              stock={15 * num}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
