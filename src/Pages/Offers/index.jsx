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

export default function Offers({ history }) {
  const classes = useStyles();
  const isScrolling = useScrollTrigger({
    disableHysteresis: true,
    threshold: 13,
  });

  return (
    <div>
      <Paper elevation={isScrolling ? 4 : 0} className={classes.header}>
        <Typography variant="h6">Ofertas</Typography>
      </Paper>
      <div style={{ paddingTop: 50 }} />

      <ul className={classes.cards}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <li key={num}>
            <Link
              to={`/products/productDetails/${num}`}
              style={{ textDecoration: "none" }}
            >
              <OfferCard
                price={1200}
                description="Hierro estructural 20 x 20, espesor 1,2mm"
                imageUrl={"https://source.unsplash.com/500x500/?hammer," + num}
                stock={15}
              />
            </Link>
          </li>
        ))}
      </ul>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        component={Link}
        to="/offers/new"
      >
        <AddIcon style={{ color: "#FFF" }} />
      </Fab>
    </div>
  );
}
