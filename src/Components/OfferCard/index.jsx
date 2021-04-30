import {
  Card,
  CardMedia,
  makeStyles,
  CardActionArea,
  CardContent,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    borderRadius: 16
  },
  cardHorizontal: {
    display: "flex",
    height: 100,
    "& $media": {
      maxWidth: 115,
      minWidth: 115,
      objectFit: "cover"
    }
  },
  content: {
    padding: 10
  },
  media: {
    height: 151
  },
  startDate: {
    fontWeight: 700,
    fontSize: 12,
    marginTop: 10,
    color: theme.palette.text.secondary
  },
  finalDate: {
    fontWeight: 700,
    fontSize: 12,
    color: theme.palette.text.secondary
  }
}));

export default function OfferCard({ price, description, imageUrl, stock }) {
  const classes = useStyles();
  return (
    <Card className={classes.card} variant="outlined">
      <CardActionArea>
        <CardMedia className={classes.media} image={imageUrl} />
        <CardContent className={classes.content}>
          <Typography
            color="primary"
            style={{ fontWeight: 700, marginTop: -5 }}
            variant="h6"
            component="h2"
          >
            ${price}
          </Typography>
          <Typography
            variant="body2"
            style={{
              fontWeight: 700,
              fontSize: 13
            }}
            component="h3"
          >
            {description}
          </Typography>

          <Typography
            variant="body2"
            className={classes.startDate}
            component="h3"
          >
            Inicio: 12/05/2020
          </Typography>
          <Typography
            variant="body2"
            className={classes.finalDate}
            component="h3"
          >
            Finalización: 26/05/2020
          </Typography>

          <Typography style={{ fontSize: 14, fontWeight: "bold" }}>
            Stock: {stock}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
