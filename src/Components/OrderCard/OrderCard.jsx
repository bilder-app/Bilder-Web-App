import { Typography, makeStyles, Chip } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    border: `thin solid #c7c7c7`,
    borderRadius: 16,
    display: "flex",
    justifyContent: "space-between"
  },
  subTitle: {
    color: theme.palette.text.secondary,
    fontWeight: 500
  },
  button: {
    background: "none",
    border: "none",
    padding: "15px 30px",
    display: "grid",
    placeItems: "center"
  },
  chipRoot: {
    height: 25
  },
  icon: {
    border: `2px solid ${theme.palette.text.primary}`,
    borderRadius: "50%"
  }
}));


function OrderCard({ data }) {
  const { id, shipping, createdAt } = data;
  const classes = useStyles();

  const index = {
    preparing: "En preparación",
    ready: "Para entregar",
    sent: "Entregado"
  }

  return (
    <Link
      style={{ textDecoration: "none", color: "inherit" }}
      to={`/orders/orderDetails/${id}`}
    >
      <div className={classes.container}>
        <div
          style={{
            padding: 10
          }}
        >
          <Typography style={{ fontWeight: 700 }} variant="h6">
            Pedido #{`000${id}`}
          </Typography>
          <Typography className={classes.subTitle}>{createdAt}</Typography>
          <Chip
            classes={{ root: classes.chipRoot }}
            style={{ marginTop: 5, marginLeft: 5 }}
            label={index[shipping.state]}
            variant="outlined"
            color="primary"
          />
        </div>
        <div className={classes.button}>
          <ChevronRightIcon className={classes.icon} />
        </div>
      </div>
    </Link>
  );
}
export default OrderCard;
