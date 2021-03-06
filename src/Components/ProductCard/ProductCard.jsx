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
    height: "100%",
    border: `thin solid #F6f6f6`
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
    height: 140,
    width: "85%",
    marginTop: 15,
    marginBottom: "auto"
  },
  horizontalMediaRoot: {
    margin: 0,
    height: "100%",
    width: "100%",
    objectFit: "cover"
  }
}));

function ProductCard({
  price,
  name,
  description,
  imageUrl,
  stock,
  horizontal = false,
  units
}) {
  const classes = useStyles();

  if (horizontal)
    return (
      <Card
        variant="outlined"
        style={{ borderRadius: 16, border: `thin solid #F6f6f6` }}
      >
        <CardActionArea className={classes.cardHorizontal}>
          <CardMedia
            classes={{ root: classes.horizontalMediaRoot }}
            className={classes.media}
            image={imageUrl}
          />
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
              style={{ fontWeight: 500, color: "#3F3C3C", marginTop: "-5px" }}
              component="h2"
            >
              {name}
            </Typography>
          </div>
          <Typography
            style={{ marginTop: 15, color: "#707070", fontWeight: 450 }}
          >
            Stock: {stock}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
