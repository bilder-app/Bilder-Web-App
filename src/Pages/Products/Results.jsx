import { useEffect, useState } from "react";
import {
  ChevronLeft as BackIcon,
  Search as SearchIcon,
} from "@material-ui/icons";
import { Button, Typography } from "@material-ui/core";
import SearchBar from "../../Components/SearchBar/SearchBar";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useGetPaginatedProductsSearch } from "../../Components/hooks/queries";

function Results({ history, location }) {
  const [searchQuery, setSearchQuery] = useState();
  const searchParams = new URLSearchParams(location.search);
  const {
    data: paginatedData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetPaginatedProductsSearch(searchParams.get("name"));

  if (isLoading) return null;

  const {
    pages: [{ totalProducts }],
  } = paginatedData;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", paddingBottom: 15 }}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: "flex",
          alignItems: "center",
          padding: 13,
        }}
      >
        <BackIcon
          onClick={() =>
            history.length > 1 ? history.goBack() : history.replace("/products")
          }
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
        {totalProducts === 0
          ? "No hay resultados para " + searchParams.get("name")
          : `${totalProducts} resultado${totalProducts > 1 ? "s" : ""} para "
        ${searchParams.get("name")}`}
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
        {paginatedData.pages.map((productsData) =>
          productsData.data.map(
            ({ id, name, price, description, images, stock }) => (
              <li key={id}>
                <ProductCard
                  name={name}
                  price={price}
                  description={description}
                  imageUrl={images[0]}
                  stock={stock}
                />
              </li>
            )
          )
        )}
      </ul>
      <Button
        onClick={fetchNextPage}
        style={{ width: "90%", margin: "auto" }}
        variant="contained"
        color="primary"
        disabled={!hasNextPage}
      >
        Ver mas
      </Button>
    </div>
  );
}

export default Results;
