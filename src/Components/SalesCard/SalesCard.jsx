import { Typography, makeStyles } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles((theme) => ({
  container: {
    border: `thin solid #c7c7c7`,
    borderRadius: 8,
    minHeight: 115,
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
    padding: "15px 30px"
  }
}));

function SalesCard({ date, number }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div
        style={{
          padding: 10
        }}
      >
        <Typography variant="h6">Venta #{number}</Typography>
        <Typography className={classes.subTitle}>{date}</Typography>
      </div>
      <button className={classes.button}>
        <ChevronRightIcon
          style={{ border: "2px solid black", borderRadius: "50%" }}
        />
      </button>
    </div>
  );
}

export default SalesCard;
