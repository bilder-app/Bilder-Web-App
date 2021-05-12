import { Typography, makeStyles, Chip } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    border: `thin solid #f6f6f6`,
    borderRadius: 16,
    display: "flex",
    justifyContent: "space-between",
  },
  subTitle: {
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
  button: {
    background: "none",
    border: "none",
    padding: "15px 30px",
    display: "grid",
    placeItems: "center",
  },
  chipRoot: {
    height: 25,
  },
}));

function OrderCard({ number, date, status, id }) {
  const classes = useStyles();
  return (
    <Link
      style={{ textDecoration: "none", color: "inherit" }}
      to={`/orders/orderDetails/${id}`}
    >
      <div className={classes.container}>
        <div
          style={{
            padding: 10,
          }}
        >
          <Typography style={{ fontWeight: 700 }} variant="h6">
            #{number}
          </Typography>
          <Typography className={classes.subTitle} variant="body2">
            {date}
          </Typography>
          <Chip
            classes={{ root: classes.chipRoot }}
            style={{ marginTop: 5, marginLeft: 5 }}
            label={status}
            color="primary"
          />
        </div>
        <div className={classes.button}>
          <ChevronRightIcon
            style={{
              width: 30,
              height: 30,
            }}
          />
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
