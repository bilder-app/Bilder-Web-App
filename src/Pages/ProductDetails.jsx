import React, { useState } from "react";
import { Typography, Modal, Paper, makeStyles } from "@material-ui/core";
import { ChevronLeft as BackIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import { useGetProductById } from "../Components/hooks/queries.js";
import { deleteProduct } from "../api";
import Carousel from "react-material-ui-carousel";

const useStyles = makeStyles((theme) => ({
  confirmModalButton: {
    backgroundColor: theme.palette.success.main,
    color: "white"
  },
  errorModalButton: {
    backgroundColor: theme.palette.error.main,
    color: "white"
  },
  carouselWrapper: { paddingTop: "100%", width: "100%", position: "relative" },
  carousel: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }
}));

function ProductDetails({ match: { params }, history }) {
  const classes = useStyles();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState();

  const { data: productData, isLoading } = useGetProductById(params.id);

  if (isLoading) return null;

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginBottom: 10,
          alignItems: "center",
          position: "fixed",
          padding: 10,
          backgroundColor: "white",
          width: "100%",
          height: "3rem",
          top: 0
        }}
      >
        <BackIcon
          onClick={() => history.goBack()}
          style={{
            width: 30,
            height: 30,
            padding: 0,
            marginRight: 6
          }}
        />
      </div>
      <div style={{ padding: 20, marginTop: 25 }}>
        <div className={classes.carouselWrapper}>
          <Carousel
            animation="slide"
            className={classes.carousel}
            navButtonsAlwaysVisible={true}
            autoPlay={false}
            indicators={false}
          >
            {productData.images.map((image, i) => (
              <img
                key={image + "" + i}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover"
                }}
                src={image}
              />
            ))}
          </Carousel>
        </div>
        <div style={{ marginTop: 20 }}>
          <Typography
            variant="h4"
            style={{ color: "#FF8000", fontWeight: 800 }}
          >
            ${productData.price}
          </Typography>
        </div>
        <div style={{ marginTop: 10 }}>
          <Typography
            variant="h5"
            style={{ color: "#3F3C3C", fontWeight: 600 }}
          >
            {productData.name}
          </Typography>
        </div>
        <div style={{ marginTop: 10 }}>
          <Typography style={{ color: "#707070", fontWeight: 450 }}>
            {productData.description}
          </Typography>
        </div>
        <div style={{ marginTop: 10 }}>
          <Typography
            variant="h6"
            style={{ color: "#3F3C3C", fontWeight: 600 }}
          >
            Especificaciones
          </Typography>
        </div>
        <div style={{ marginTop: 10 }}>
          <Typography style={{ color: "#707070", fontWeight: 450 }}>
            {`Contenido: ${productData.content} ${productData.contentType}`}
          </Typography>
          <Typography style={{ color: "#707070", fontWeight: 450 }}>
            {`Marca: ${productData.brand}`}
          </Typography>
          <Typography style={{ color: "#707070", fontWeight: 450 }}>
            {`Modelo: ${productData.model}`}
          </Typography>
        </div>
        <div style={{ marginTop: 10 }}>
          <Typography
            variant="h6"
            style={{ color: "#3F3C3C", fontWeight: 600 }}
          >
            Categorias
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap"
          }}
        >
          {["Martillo", "Pintura"].map((label, index) => {
            return (
              <Chip
                label={label}
                key={index}
                color="primary"
                variant="outlined"
                style={{
                  marginTop: 5,
                  height: 25,
                  marginLeft: 10,
                  padding: "0 20px"
                }}
              />
            );
          })}
        </div>
      </div>
      <div style={{ paddingTop: "4rem" }}>
        <div
          style={{
            // width: "100%",
            // height: 40,
            // display: "flex",
            // justifyContent: "space-evenly",
            backgroundColor: "white",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-evenly",
            position: "fixed",
            bottom: 0,
            height: "4rem",
            alignItems: "center"
          }}
        >
          <Button
            component={Link}
            to={`/products/edit/${params.id}`}
            variant="contained"
            style={{
              backgroundColor: "#40E364",
              color: "white",
              borderRadius: 20,
              height: 40,
              width: 167
            }}
          >
            Editar
          </Button>
          <Button
            onClick={() => setIsDeleteModalOpen(true)}
            variant="contained"
            style={{
              backgroundColor: "#E35440",
              color: "white",
              borderRadius: 20,
              height: 40,
              width: 167
            }}
          >
            Eliminar
          </Button>
        </div>
        <Modal
          open={isDeleteModalOpen}
          style={{ display: "grid", placeItems: "center" }}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <Paper style={{ padding: 16 }}>
            <Typography>
              Estas seguro que queres eliminar este producto?
            </Typography>
            <div style={{ marginTop: 16 }}>
              <Button
                className={classes.confirmModalButton}
                style={{ width: "30%", marginRight: 16 }}
                variant="contained"
                onClick={() =>
                  deleteProduct(params.id).then(() =>
                    history.replace("/products")
                  )
                }
              >
                Si
              </Button>
              <Button
                onClick={() => setIsDeleteModalOpen(false)}
                className={classes.errorModalButton}
                style={{ width: "30%" }}
                variant="contained"
              >
                No
              </Button>
            </div>
          </Paper>
        </Modal>
      </div>
    </div>
  );
}

export default ProductDetails;
