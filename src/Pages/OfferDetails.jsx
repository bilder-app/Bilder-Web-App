import React, { useState } from "react";
import { ChevronLeft as BackIcon } from "@material-ui/icons";
import { Typography, makeStyles, Input, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    marginBottom: 10,
    height: 50,
    alignItems: "center",
    boxShadow: "0px 1px 4px 0 rgba(180, 180, 180, .3)",
  },
  icon: {
    border: "2px solid black",
    borderRadius: "50%",
    width: 23,
    height: 23,
    margin: "0px 15px",
  },
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 10,
  },

  component: {
    width: "80%",
    height: 75,
    flexDirection: "column",
    // backgroundColor: "#EFEFEF",
    marginBottom: 32,
  },
  customInput: {
    width: "100%",
    height: 41,
    paddingLeft: 13,
    borderRadius: 15,
    border: "solid 1px #CCC",
    marginTop: 10,
    color: "#000",
  },
  customLabel: {
    fontWeight: "500",
  },

  buttons: {
    color: "#FFF",
    borderRadius: 20,
    height: "100%",
    width: "48%",
    textTransform: "none",
    fontWeight: 400,
  },
}));

export default function OfferDetails({ match: { params }, history }) {
  const id = parseInt(params.id, 10);
  const offers = [
    {
      product: "Pintura Alba latex interior",
      start: "11/06/2020",
      end: "25/06/2020",
      stock: 50,
      price: 190,
    },
    {
      product: "Madera Pino 20mm",
      start: "15/06/2020",
      end: "30/06/2020",
      stock: 30,
      price: 75,
    },
  ];
  const [value, setValue] = useState({
    product: "",
    start: "",
    end: "",
    stock: 0,
    price: 0,
  });
  const [editable, setEditable] = useState(false);

  const handleInput = (e, prop) => {
    setValue({ ...value, [prop]: e.target.value });
  };
  const classes = useStyles();
  return (
    <div>
      <div className={classes.header}>
        <BackIcon onClick={() => history.goBack()} className={classes.icon} />
        <Typography variant="h6">Ofertas</Typography>
      </div>

      <form className={classes.container} noValidate autoComplete="off">
        <div className={classes.component}>
          <Typography component="label" className={classes.customLabel}>
            Producto
          </Typography>
          <Input
            placeholder="Producto"
            disableUnderline={true}
            value={value.product || offers[id].product}
            onChange={(e) => handleInput(e, "product")}
            disabled={!editable}
            className={classes.customInput}
          />
        </div>
        <div className={classes.component}>
          <Typography component="label" className={classes.customLabel}>
            Fecha de Inicio
          </Typography>
          <Input
            placeholder="Fecha de Inicio"
            disableUnderline={true}
            value={value.start || offers[id].start}
            onChange={(e) => handleInput(e, "start")}
            disabled={!editable}
            className={classes.customInput}
          />
        </div>
        <div className={classes.component}>
          <Typography component="label" className={classes.customLabel}>
            Fecha de Finalización
          </Typography>
          <Input
            placeholder="Fecha de Finalización"
            disableUnderline={true}
            value={value.end || offers[id].end}
            onChange={(e) => handleInput(e, "end")}
            disabled={!editable}
            className={classes.customInput}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          <div className={classes.component} style={{ width: "48%" }}>
            <Typography component="label" className={classes.customLabel}>
              Cantidad
            </Typography>
            <Input
              placeholder="Cantidad"
              disableUnderline={true}
              value={value.stock || offers[id].stock}
              onChange={(e) => handleInput(e, "stock")}
              disabled={!editable}
              className={classes.customInput}
            />
          </div>
          <div className={classes.component} style={{ width: "48%" }}>
            <Typography component="label" className={classes.customLabel}>
              Precio Unitario
            </Typography>
            <Input
              placeholder="Precio Unitario"
              disableUnderline={true}
              value={value.price || offers[id].price}
              onChange={(e) => handleInput(e, "price")}
              disabled={!editable}
              className={classes.customInput}
            />
          </div>
        </div>
      </form>

      <div
        style={{
          height: 35,
          width: "86%",
          position: "absolute",
          bottom: 30,
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "7%",
          marginRight: "7%",
        }}
      >
        <Button
          variant="contained"
          className={classes.buttons}
          style={{ backgroundColor: editable ? "#E49012" : "#40E364" }}
          onClick={() => setEditable(true)}
        >
          {editable ? "Confirmar" : "Editar"}
        </Button>
        <Button
          className={classes.buttons}
          variant="contained"
          style={{ backgroundColor: "#E35440" }}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
}
