import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { BiBox } from "react-icons/bi";
import { FiTruck, FiUser } from "react-icons/fi";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-evenly",
    position: "fixed",
    bottom: 0,
    height: "4rem",
    alignItems: "center"
  },
  action: {
    minWidth: "inherit"
  }
}));

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(
    () => history.location.pathname.split("/")[1]
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(newValue);
  };

  history.listen((location) => {
    setValue(location.pathname.split("/")[1]);
  });

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.container}
    >
      <BottomNavigationAction
        className={classes.action}
        label="Pedidos"
        value="orders"
        icon={<FiTruck size={25} />}
      />
      <BottomNavigationAction
        className={classes.action}
        label="Productos"
        value="products"
        icon={<BiBox size={25} />}
      />
      <BottomNavigationAction
        className={classes.action}
        label="Ofertas"
        value="offers"
        icon={<RiMoneyDollarBoxLine size={25} />}
      />
      <BottomNavigationAction
        className={classes.action}
        label="Perfil"
        value="me"
        icon={<FiUser size={25} />}
      />
    </BottomNavigation>
  );
}
