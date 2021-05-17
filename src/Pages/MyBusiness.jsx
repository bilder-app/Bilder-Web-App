import React from "react";
import { Link } from "react-router-dom";
import { Typography, Avatar } from "@material-ui/core";
import { Contacts, Store } from "@material-ui/icons";
import CreateIcon from "@material-ui/icons/Create";
import { makeStyles } from "@material-ui/core/styles";
import { ChevronLeft as BackIcon } from "@material-ui/icons";
import { useMyBusiness } from "../../src/Components/hooks/queries";

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
  const { data: BusinessData, isLoading } = useMyBusiness();
  if (isLoading) return null;
  return (
    <div style={{ widht: "100%", height: "100%", color: "#444D52" }}>
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

        <Link style={{ color: "#444D52" }} to={"/me/business/edit"}>
          <CreateIcon />
        </Link>
      </div>

      <div className={classes.info}>
        <Avatar
          alt="Avatar"
          src="https://source.unsplash.com/500x500/?hammer"
          className={classes.large}
        />

        <div style={{ width: "80%", padding: 20 }}>
          <div
            style={{ display: "flex", paddingBottom: 5, alignItems: "center" }}
          >
            <Contacts style={{ marginRight: 10 }} />
            <Typography variant="h6">Sobre mi</Typography>
          </div>
          <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
            Nombre y Apellido
          </Typography>
          <Typography variant="subtitle1">
            {BusinessData.name} {BusinessData.surname}
          </Typography>
          <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
            E-mail
          </Typography>
          <Typography>billy@bilder.com</Typography>
          <div
            style={{
              display: "flex",
              paddingBottom: 5,
              paddingTop: 5,
              alignItems: "center",
            }}
          >
            <Store style={{ marginRight: 10 }} />
            <Typography variant="h6">Sobre mi negocio</Typography>
          </div>
          <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
            CUIT
          </Typography>
          <Typography>{BusinessData.cuit}</Typography>
          <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
            Industria
          </Typography>
          <Typography>{BusinessData.sector}</Typography>
          <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
            Dirreción
          </Typography>
          <Typography>{BusinessData.address}</Typography>
          <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
            Contacto
          </Typography>
          <Typography>{BusinessData.contact}</Typography>
        </div>
      </div>
    </div>
  );
}
