import React from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import {
  makeStyles,
  Fab,
  Typography,
  useScrollTrigger,
  Paper
} from "@material-ui/core";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { Search as SearchIcon, Add as AddIcon } from "@material-ui/icons";
import { useGetAllProducts } from "../../Components/hooks/queries";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  addMoreIconContainer: {
    border: "none",
    background: "transparent",
    marginRight: 5,
    marginTop: 6
  },
  addMoreIcon: {
    color: theme.palette.text.primary
  },
  titleBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    position: "fixed",
    top: 0,
    zIndex: 1,
    width: "100%",
    height: 50,
    borderRadius: 0
  },
  cards: {
    padding: 20,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    listStyle: "none",
    gap: 15,
    alignItems: "stretch"
  }
}));

const NoProducts = () => (
  <div
    style={{
      position: "fixed",
      width: "100vw",
      top: 0,
      left: 0,
      height: "100vh"
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.6,
        height: "100%",
        width: "100%"
      }}
    >
      <LocalOfferIcon style={{ height: 50, width: 50 }} />
      <Typography variant="h6">No hay productos, añada uno.</Typography>
    </div>
  </div>
);

function Products() {
  const classes = useStyles();
  const isScrolling = useScrollTrigger({
    disableHysteresis: true,
    threshold: 13
  });

  const { data: productsData } = useGetAllProducts();

  return (
    <div>
      <Paper elevation={isScrolling ? 4 : 0} className={classes.titleBar}>
        <Typography variant="h6" style={{ fontWeight: 500 }}>
          Mis Productos
        </Typography>
        <Link
          className={classes.addMoreIconContainer}
          to="/products/searchProducts"
        >
          <SearchIcon className={classes.addMoreIcon} />
        </Link>
      </Paper>

      <div style={{ padding: "13px 10px" }} />

      {productsData && productsData.length ? (
        <ul className={classes.cards}>
          {productsData.map(({ id, ...productData }) => (
            <li key={id}>
              <Link
                to={`/products/productDetails/${id}`}
                style={{
                  textDecoration: "none"
                }}
              >
                <ProductCard
                  {...productData}
                  imageUrl={productData.images[0]}
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <NoProducts />
      )}

      <Fab
        style={{ position: "fixed", bottom: "5rem", right: "2rem" }}
        color="primary"
        component={Link}
        to="/products/newProduct"
      >
        <AddIcon style={{ color: "white" }} />
      </Fab>
    </div>
  );
}

export default Products;
