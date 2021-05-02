import ProductCard from "../../Components/ProductCard/ProductCard";
import {
  makeStyles,
  Fab,
  Typography,
  useScrollTrigger,
  Paper
} from "@material-ui/core";
import { Search as SearchIcon, Add as AddIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useGetAllProducts } from "../../Components/hooks/queries";

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
    padding: "0 13px",
    position: "fixed",
    top: 0,
    zIndex: 1,
    width: "100%",
    height: 50,
    borderRadius: 0
  },
  cards: {
    padding: 15,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    listStyle: "none",
    gap: 15,
    alignItems: "stretch"
  }
}));

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

      <div style={{ paddingTop: 50 }} />

      <ul className={classes.cards}>
        {productsData &&
          productsData.map(({ id, ...productData }) => (
            <li key={id}>
              {/* <Link
                to={`/products/productDetails/${id}`}
                style={{
                  textDecoration: "none"
                }}
              > */}
              <ProductCard
                {...productData}
                imageUrl={`https://source.unsplash.com/500x500/?tool,${id}`}
              />
              {/* </Link> */}
            </li>
          ))}
      </ul>

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
