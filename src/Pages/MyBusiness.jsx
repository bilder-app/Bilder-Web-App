import React from "react";
import { Typography, Avatar } from "@material-ui/core";
import { Contacts, Store } from "@material-ui/icons";
import CreateIcon from "@material-ui/icons/Create";
import { makeStyles } from "@material-ui/core/styles";
import { ChevronLeft as BackIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    height: 50,
    alignItems: "center",
    position: "fixed",
    top: 0,
    width: "100%",
    padding: 13,
    background: theme.palette.background.paper,
    zIndex: 1,
  },
  icon: {
    border: "2px solid black",
    borderRadius: "50%",
    width: 23,
    height: 23,
    margin: "0px 15px",
  },

  info: {
    width: "100%",
    // borderBottom: "solid 2px #ccc",
    height: 250,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 0 30px 0",
  },
  large: {
    width: 150,
    height: 150,
  },
  userName: {
    color: "#444D52",
    fontWeight: "bold",
    marginBottom: 0,
  },
  email: {
    lineHeight: 1,
    color: "#707070",
  },

  nav: {
    width: "90%",
    margin: "0px auto",
    paddingBottom: 75,
  },
  textItem: {
    fontSize: 19,
    color: "#444D52",
    fontWeight: 500,
  },

  fab: {
    position: "fixed",
    bottom: theme.spacing(15),
    right: 15,
    backgroundColor: "#25D366",
    color: "#FFF",
    height: 46,
    textTransform: "none",
    fontSize: 15,
  },
}));

export default function MyBusiness({ match: { params }, history }) {
  const classes = useStyles();

  return (
    <div style={{ widht: "100%", height: "100%", backgroundColor: "white" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",

          height: "3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: 10,

            width: "90%",
            height: "3rem",
          }}
        >
          <BackIcon
            onClick={() => history.goBack()}
            style={{
              width: 30,
              height: 30,
              padding: 0,
              marginRight: 6,
            }}
          />
          <Typography variant="h6">Mi negocio</Typography>
        </div>
        <CreateIcon />
      </div>

      <div className={classes.info}>
        <Avatar
          alt="Avatar"
          src="https://source.unsplash.com/500x500/?hammer"
          className={classes.large}
        />
        <Typography variant="h6" className={classes.userName}>
          Henry
        </Typography>
        <Typography variant="subtitle1" className={classes.email}>
          henry@bilder.com
        </Typography>
        <div style={{ width: "80%", padding: 20 }}>
          <div
            style={{ display: "flex", paddingBottom: 10, alignItems: "center" }}
          >
            <Contacts />
            <Typography variant="h6">Sobre mi</Typography>
          </div>
          <Typography variant="h6">Nombre y Apellido</Typography>
          <Typography>Billy Bautista</Typography>
          <Typography variant="h6">E-mail</Typography>
          <Typography>billy@bilder.com</Typography>
          <div
            style={{
              display: "flex",
              paddingBottom: 10,
              paddingTop: 10,
              alignItems: "center",
            }}
          >
            <Store />
            <Typography variant="h6">Sobre mi negocio</Typography>
          </div>
          <Typography variant="h6">CUIT</Typography>
          <Typography>35-12345678-00</Typography>
          <Typography variant="h6">Industria</Typography>
          <Typography>Ferreteria</Typography>
          <Typography variant="h6">Dirreción</Typography>
          <Typography>Lacarra 123</Typography>
          <Typography variant="h6">Contacto</Typography>
          <Typography>1153821829</Typography>
        </div>
      </div>
    </div>
  );
}
