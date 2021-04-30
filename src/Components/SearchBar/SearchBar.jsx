import { forwardRef } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  searchBar: {
    backgroundColor: "#eeeeee",
    borderRadius: 9999,
    color: "black",
    padding: "10px 15px",
    width: "100%",
    margin: 0,
    border: "none",
    fontSize: "1rem",
    "&::placeholder": {
      color: "black"
    },
    "&:focus, &:active": {
      outline: "none"
    }
  }
}));

const SearchBar = forwardRef((props, ref) => {
  const classes = useStyles();
  return (
    <input
      ref={ref}
      {...props}
      className={classes.searchBar}
      placeholder="Buscar..."
    />
  );
});

export default SearchBar;
