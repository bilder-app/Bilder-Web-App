import { useState } from "react";
import { ChevronLeft as BackIcon } from "@material-ui/icons";
import { Typography, makeStyles, Input, Button } from "@material-ui/core";
import AsyncSelect from "react-select/async";

const productOptions = ["martillo", "clavos", "producto3", "asd", "reg"];

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    marginBottom: 10,
    height: 50,
    alignItems: "center",
    boxShadow: "0px 1px 4px 0 rgba(180, 180, 180, .3)"
  },
  icon: {
    border: "2px solid black",
    borderRadius: "50%",
    width: 23,
    height: 23,
    margin: "0px 15px"
  },
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 10
  },

  component: {
    width: "80%",
    height: 75,
    flexDirection: "column",
    // backgroundColor: "#EFEFEF",
    marginBottom: 32
  },
  customInput: {
    width: "100%",
    height: 41,
    paddingLeft: 13,
    borderRadius: 15,
    border: "solid 1px #CCC",
    marginTop: 10,
    color: "#000"
  },
  customLabel: {
    fontWeight: "500"
  }
}));

const filterColors = (inputValue) => {
  return productOptions
    .map((i) => ({ label: i }))
    .filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterColors(inputValue));
  }, 250);
};

export default function NewOffer({ history }) {
  const [searchState, setSearchState] = useState();
  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "");
    setSearchState(inputValue);
    return inputValue;
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      // none of react-select's styles are passed to <Control />
      width: "100%",
      height: 41,
      borderRadius: 15,
      border: "solid 1px #CCC",
      marginTop: 10,
      color: "#000"
    })
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
          <AsyncSelect
            isClearable
            loadOptions={loadOptions}
            onInputChange={handleInputChange}
            styles={customStyles}
            placeholder="Producto"
          />
        </div>
        <div className={classes.component}>
          <Typography component="label" className={classes.customLabel}>
            Fecha de Inicio
          </Typography>
          <Input
            placeholder="Fecha de Inicio"
            disableUnderline={true}
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
            className={classes.customInput}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "80%"
          }}
        >
          <div className={classes.component} style={{ width: "48%" }}>
            <Typography component="label" className={classes.customLabel}>
              Cantidad
            </Typography>
            <Input
              placeholder="Cantidad"
              disableUnderline={true}
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
              className={classes.customInput}
            />
          </div>
        </div>
      </form>

      <Button
        variant="contained"
        color="primary"
        style={{
          color: "#FFF",
          borderRadius: 20,
          height: 40,
          width: "85%",
          margin: "0 7.5%",
          position: "absolute",
          bottom: 25
        }}
      >
        Crear Oferta
      </Button>
    </div>
  );
}
