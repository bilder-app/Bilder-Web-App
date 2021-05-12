import React, { useState } from "react";
import { Typography, Card } from "@material-ui/core";
import { ChevronLeft as Backicon } from "@material-ui/icons";
import { CardMedia, Modal, Paper, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import { useGetProductById } from "../Components/hooks/queries.js";
import { deleteProduct } from "../api";

const useStyles = makeStyles((theme) => ({
  confirmModalButton: {
    backgroundColor: theme.palette.success.main,
    color: "white",
  },
  errorModalButton: {
    backgroundColor: theme.palette.error.main,
    color: "white",
  },
}));

function ProductDetails({ match: { params }, history }) {
  const classes = useStyles();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState();

  const { data: productData, isLoading } = useGetProductById(params.id);

  console.log(productData);
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
          top: 0,
        }}
      >
        <Backicon
          onClick={() => history.goBack()}
          style={{
            border: "2px solid black",
            borderRadius: "50%",
            width: 25,
            height: 25,
            padding: 0,
            marginRight: 8,
          }}
        />
      </div>
      <div style={{ padding: 10, marginTop: 25 }}>
        <Card style={{ maxWidth: "100%" }}>
          <CardMedia style={{ height: 400 }} image={productData.images[0]} />
        </Card>
        <Typography variant="h5">${productData.price}</Typography>
        <Typography variant="h6">{productData.name}</Typography>
        <Typography>{productData.description}</Typography>
        <Typography variant="h6">Especificaciones</Typography>
        <Typography> {`Contenido: ${productData.content}`}</Typography>
        <Typography> {`Marca: ${productData.brand}`}</Typography>
        <Typography> {`Modelo: ${productData.model}`}</Typography>

        <Typography variant="h6">Categorias</Typography>
        <div
          style={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
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
                  padding: "0 20px",
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
            alignItems: "center",
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
              width: 167,
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
              width: 167,
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
