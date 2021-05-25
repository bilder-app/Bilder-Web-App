import { AppBar, Toolbar, useTheme, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft as BackIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  toolbarRoot: {
    minHeight: "initial"
  }
}));

function AppBarHeader({ backTo, children, ...rest }) {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      style={{
        maxHeight: 50,
        padding: 10,
        backgroundColor: theme.palette.background.paper
      }}
      position="static"
      elevation={0}
    >
      <Toolbar
        style={{
          alignItems: "normal"
        }}
        disableGutters
        classes={{
          root: classes.toolbarRoot
        }}
      >
        <div
          style={{
            maxHeight: 30,
            display: "flex",
            alignItems: "center"
          }}
        >
          {backTo && (
            <Link
              style={{
                display: "grid",
                placeItems: "center",
                marginRight: 6
              }}
              to={backTo}
            >
              <BackIcon
                style={{
                  color: theme.palette.text.primary,
                  width: 30,
                  height: 30
                }}
              />
            </Link>
          )}
          {children}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarHeader;
