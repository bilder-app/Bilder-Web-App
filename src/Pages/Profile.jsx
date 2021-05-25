import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Fab,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useScrollTrigger,
  Paper
} from "@material-ui/core";
import { Store, Help, PowerSettingsNew } from "@material-ui/icons";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { makeStyles } from "@material-ui/core/styles";
import { logOut } from "../api";
import { useMyBusiness } from "../Components/hooks/queries";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    height: 50,
    alignItems: "center",
    position: "fixed",
    top: 0,
    width: "100%",
    padding: 20,
    background: theme.palette.background.paper,
    zIndex: 1
  },
  icon: {
    border: "2px solid black",
    borderRadius: "50%",
    width: 23,
    height: 23,
    margin: "0px 15px"
  },

  info: {
    width: "100%",
    // borderBottom: "solid 2px #ccc",
    height: 250,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 0 30px 0"
  },
  large: {
    width: 150,
    height: 150
  },
  userName: {
    color: "#444D52",
    fontWeight: "bold",
    marginBottom: 0
  },
  email: {
    lineHeight: 1,
    color: "#707070"
  },

  nav: {
    width: "90%",
    margin: "0px auto",
    paddingBottom: 75
  },
  textItem: {
    fontSize: 19,
    color: "#444D52",
    fontWeight: 500
  },

  fab: {
    position: "fixed",
    bottom: theme.spacing(15),
    right: 15,
    backgroundColor: "#25D366",
    color: "#FFF",
    height: 46,
    textTransform: "none",
    fontSize: 15
  }
}));

export default function Profile({ history }) {
  const classes = useStyles();
  const isScrolling = useScrollTrigger({
    disableHysteresis: true,
    threshold: 13
  });

  const { data: businessData, isLoading } = useMyBusiness({
    refetchOnWindowFocus: false
  });

  return (
    <div style={{ widht: "100%", height: "100%", backgroundColor: "white" }}>
      <Paper elevation={isScrolling ? 4 : 0} className={classes.header}>
        <Typography variant="h6">Mi Perfil</Typography>
      </Paper>
      <div style={{ marginTop: 50 }} />
      <div className={classes.info}>
        {!isLoading && (
          <>
            <Avatar
              alt="Avatar"
              src={businessData.profileImage}
              className={classes.large}
            />
            <Typography variant="h6" className={classes.userName}>
              {businessData.name} {businessData.surname}
            </Typography>
            <Typography variant="subtitle1" className={classes.email}>
              henry@bilder.com
            </Typography>
          </>
        )}
      </div>
      <List className={classes.nav}>
        <ListItem button component={Link} to={`/me/business`}>
          <ListItemIcon>
            <Store className={classes.icons} style={{ fontSize: 33 }} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              className: classes.textItem
            }}
            primary={"Mi negocio"}
          />
        </ListItem>
        <ListItem button component={Link} to={`/me/faq`}>
          <ListItemIcon>
            <Help className={classes.icons} style={{ fontSize: 33 }} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              className: classes.textItem
            }}
            primary={"Preguntas frecuentes"}
          />
        </ListItem>
        <ListItem
          button
          onClick={() => logOut().then(() => history.replace("/"))}
        >
          <ListItemIcon>
            <PowerSettingsNew
              className={classes.icons}
              style={{ fontSize: 33 }}
            />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              className: classes.textItem
            }}
            primary={"Cerrar sesión"}
          />
        </ListItem>
      </List>
      <Fab
        aria-label="add"
        className={classes.fab}
        component={Link}
        to="/offers/new"
        variant="extended"
      >
        <WhatsAppIcon style={{ color: "#FFF", fontSize: 29, marginRight: 7 }} />
        ¿Cómo podemos ayudarte?
      </Fab>
    </div>
  );
}

// WhatsApp
