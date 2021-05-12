import OrdersTab from "./OrdersTab";
import {
  Typography,
  Fab,
  makeStyles,
  Paper,
  useScrollTrigger,
} from "@material-ui/core";

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

export default function Orders({ history }) {
  const classes = useStyles();
  const isScrolling = useScrollTrigger({
    disableHysteresis: true,
    threshold: 13,
  });

  return (
    <div style={{ backgroundColor: "white" }}>
      <Paper elevation={isScrolling ? 4 : 0} className={classes.header}>
        <Typography variant="h6">Mis pedidos</Typography>
      </Paper>
      <div style={{ paddingTop: 50 }} />
      <OrdersTab />
    </div>
  );
}
