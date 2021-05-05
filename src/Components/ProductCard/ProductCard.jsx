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
    width: "100%",
    borderRadius: 16,
    minWidth: 150,
    height: "100%"
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
  media: {
    height: 151,
    width: "100%",
    marginBottom: "auto"
  }
}));

function ProductCard({
  price,
  description,
  imageUrl,
  stock,
  horizontal = false,
  units
}) {
  const classes = useStyles();

  if (horizontal)
    return (
      <Card variant="outlined" style={{ borderRadius: 16 }}>
        <CardActionArea className={classes.cardHorizontal}>
          <CardMedia className={classes.media} image={imageUrl} />
          <CardContent style={{ flexGrow: 1 }}>
            <Typography gutterBottom component="h2" variant="body2">
              {description}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Typography
                color="primary"
                variant="body2"
                style={{ fontWeight: 700 }}
              >
                ${price}
              </Typography>
              <Typography variant="body2" style={{ fontWeight: 700 }}>
                {units ? (
                  <>
                    <span style={{ marginRight: 5, fontSize: "1.25em" }}>
                      {units}
                    </span>
                    Unidades
                  </>
                ) : (
                  `Stock: ${stock}`
                )}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    );

  return (
    <Card variant="outlined" className={classes.card}>
      <CardActionArea
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <CardMedia className={classes.media} image={imageUrl} />
        <CardContent
          style={{
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            width: "100%"
          }}
        >
          <div style={{ marginBottom: "auto" }}>
            <Typography
              gutterBottom
              color="primary"
              style={{ fontWeight: 700 }}
              variant="h6"
              component="h2"
            >
              ${price}
            </Typography>
            <Typography
              variant="body2"
              style={{ fontWeight: 700 }}
              component="h3"
            >
              {description}
            </Typography>
          </div>
          <Typography style={{ marginTop: 15 }}>Stock: {stock}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
