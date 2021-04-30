import ProductCard from "../../Components/ProductCard/ProductCard";
import {
  makeStyles,
  Fab,
  Typography,
  useScrollTrigger,
  Paper,
} from "@material-ui/core";
import { Search as SearchIcon, Add as AddIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  addMoreIconContainer: {
    border: "none",
    background: "transparent",
    marginRight: 5,
    marginTop: 6,
  },
  addMoreIcon: {
    color: theme.palette.text.primary,
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
    borderRadius: 0,
  },
  cards: {
    padding: 15,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    listStyle: "none",
    gap: 15,
  },
}));

function Products() {
  const classes = useStyles();
  const isScrolling = useScrollTrigger({
    disableHysteresis: true,
    threshold: 13,
  });
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

      <div style={{ paddingTop: 30 }} />

      <ul className={classes.cards}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <li key={num}>
            <Link
              to={`/products/productDetails/${num}`}
              style={{ textDecoration: "none" }}
            >
              <ProductCard
                price={1250 * num}
                description="Latex Interior Albalatex Ultra Lavable Blanco "
                imageUrl={`https://source.unsplash.com/500x500/?tool,${num}`}
                stock={15 * num}
              />
            </Link>
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
