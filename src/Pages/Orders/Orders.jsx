import { useState } from "react";
import OrdersTab from "./OrdersTab";
import {
  Typography,
  makeStyles,
  Paper,
  useScrollTrigger,
  Tabs,
  Tab
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
    padding: 20,
    borderRadius: 0
  },
  tabContainer: { flexGrow: 1, maxWidth: "initial" },
  tabsContainer: { display: "flex" }
}));

export default function Orders() {
  const classes = useStyles();
  const isScrolling = useScrollTrigger({
    disableHysteresis: true,
    threshold: 13
  });
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <Paper elevation={isScrolling ? 4 : 0} className={classes.header}>
        <Typography style={{ color: "#373737" }} variant="h6">
          Mis pedidos
        </Typography>
      </Paper>
      <div style={{ paddingTop: 50 }} />

      <Tabs
        className={classes.tabsContainer}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
      >
        <Tab className={classes.tabContainer} label="Pendientes" />
        <Tab className={classes.tabContainer} label="Confirmados" />
      </Tabs>
      <OrdersTab show={value} />
    </div>
  );
}
