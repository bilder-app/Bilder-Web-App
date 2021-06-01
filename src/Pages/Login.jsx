import { makeStyles, Button, TextField, Typography } from "@material-ui/core";
import logoImg from "../assets/bilder.png";
import { useHistory, Link } from "react-router-dom";
import { logIn } from "../api";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#FF8000",
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 45,
    paddingTop: "20%",
  },
  logo: {
    width: 256,
  },
  button: {
    color: "#FF8000",
    backgroundColor: "white",
    width: "100%",
    maxWidth: 275,
    borderRadius: 12,
    fontSize: "1rem",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: "2px 10px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    fontWeight: 500,
    width: "100%",
    maxWidth: 275,
    color: "white",
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { register, getValues } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(getValues()).then(() => history.replace("/orders"));
  };

  return (
    <form onSubmit={handleSubmit} className={classes.container}>
      <img src={logoImg} alt="Bilder logo" className={classes.logo} />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 25,
        }}
      >
        <Typography variant="h6" component="label" className={classes.label}>
          Correo electronico
          <TextField
            {...register("email")}
            required
            InputProps={{
              classes: { root: classes.input },
              disableUnderline: true,
            }}
          />
        </Typography>
        <Typography variant="h6" component="label" className={classes.label}>
          Contraseña
          <TextField
            {...register("password")}
            required
            InputProps={{
              classes: { root: classes.input },
              disableUnderline: true,
            }}
          />
          <Link style={{ color: "white" }}>
            <Typography variant="body2">Olvidé mi contraseña</Typography>
          </Link>
        </Typography>
      </div>
      <Button type="submit" variant="contained" className={classes.button}>
        Iniciar sesión
      </Button>
    </form>
  );
}

export default Login;
