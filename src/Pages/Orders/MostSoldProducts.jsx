import { Link } from "react-router-dom";
import { ChevronLeft as BackIcon } from "@material-ui/icons";
import {
  Typography,
  Fab,
  makeStyles,
  Paper,
  useScrollTrigger,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import OfferCard from "../../Components/OfferCard";
import ProductCard from "../../Components/ProductCard/ProductCard";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    marginBottom: 10,
    height: 50,
    position: "fixed",
    top: 0,
    width: "100%",
    alignItems: "center",
    zIndex: 1,
    padding: 13,
    borderRadius: 0,
  },
  icon: {
    border: "2px solid black",
    borderRadius: "50%",
    width: 23,
    height: 23,
    margin: "0px 15px",
  },
  cards: {
    padding: 15,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    listStyle: "none",
    gap: 15,
  },
  fab: {
    position: "fixed",
    bottom: "5rem",
    right: "2rem",
  },
}));

export default function MostSoldProducts({ history }) {
  const classes = useStyles();
  const isScrolling = useScrollTrigger({
    disableHysteresis: true,
    threshold: 13,
  });

  return (
    <div>
      <Paper elevation={isScrolling ? 4 : 0} className={classes.header}>
        <BackIcon
          onClick={() => history.goBack()}
          style={{
            border: "2px solid black",
            borderRadius: "50%",
            width: 25,
            height: 25,
            padding: 0,
            marginRight: 8,
          }}
        />
        <Typography variant="h6">Productos más Vendidos</Typography>
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
    </div>
  );
}
