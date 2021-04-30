import { useState } from "react";
import { ExpandMore as MoreIcon } from "@material-ui/icons";
import ProductCard from "../../Components/ProductCard/ProductCard";
import CardTotal from "./CardTotal";
import {
  ListItem,
  List,
  Modal,
  Card,
  ListItemText,
  Paper,
  Typography,
  ButtonBase,
  makeStyles,
  Button,
  Divider,
  IconButton
} from "@material-ui/core";
import { Link } from "react-router-dom";
import esLocale from "date-fns/locale/es";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import StorefrontIcon from "@material-ui/icons/Storefront";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import PaymentIcon from "@material-ui/icons/Payment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  verticalCardsList: {
    padding: 10,
    gap: 15,
    display: "flex",
    overflow: "auto",
    listStyle: "none",
    margin: 0
  },
  horizontalCardList: {
    listStyle: "none",
    margin: 0,
    padding: "0 13px",
    gap: 15,
    display: "flex",
    flexDirection: "column"
  },
  addMoreIconContainer: {
    border: "none",
    background: "transparent"
  },
  addMoreIcon: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: "50%"
  },
  fondo: {
    borderRadius: "20px",
    height: 170
  },
  activos: {
    color: "#FF8000"
  },
  inactivos: {
    color: "#367BF5"
  },
  churn: {
    color: "#2FA84F"
  },
  list: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  div: {
    height: 35,
    width: 35,
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.background.default
        : theme.palette.grey[100],
    justifyContent: "center",
    padding: 5,
    marginRight: 10
  }
}));

function SalesTab() {
  const classes = useStyles();
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [startDatePicked, setStartDatePicked] = useState(new Date());
  const [endDatePicked, setEndDatePicked] = useState(new Date());

  const handleCloseStatsModal = () => setIsStatsModalOpen(false);

  return (
    <div>
      <ButtonBase
        style={{
          marginTop: 10,
          padding: "0 13px",
          display: "flex",
          justifyContent: "space-between",
          width: "100%"
        }}
        onClick={() => setIsStatsModalOpen(true)}
      >
        <Typography variant="h6" style={{ fontWeight: 500 }}>
          Resumen
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Typography variant="h6" style={{ fontWeight: 500 }}>
            Mes
          </Typography>
          <MoreIcon style={{ marginLeft: 5 }} color="primary" />
        </div>
      </ButtonBase>

      <Modal
        open={isStatsModalOpen}
        onClose={handleCloseStatsModal}
        style={{ display: "flex", overflow: "auto" }}
      >
        <Paper style={{ minWidth: 300, margin: "auto" }}>
          <List>
            <ListItem component="li" button>
              <ListItemText>Hoy</ListItemText>
            </ListItem>
            <ListItem component="li" button>
              <ListItemText>Esta semana</ListItemText>
            </ListItem>
            <ListItem component="li" button>
              <ListItemText>Este mes</ListItemText>
            </ListItem>
            <ListItem component="li" button>
              <ListItemText>Este trimestre</ListItemText>
            </ListItem>
            <ListItem component="li" button>
              <ListItemText>Este año</ListItemText>
            </ListItem>
            <li>
              <Divider />
            </li>
            <ListItem
              component="li"
              button
              onClick={() => {
                setIsStatsModalOpen(false);
                setIsDateModalOpen(true);
              }}
            >
              <ListItemText>Elige una fecha</ListItemText>
            </ListItem>
          </List>
        </Paper>
      </Modal>

      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        <Modal
          open={isDateModalOpen}
          onClose={() => setIsDateModalOpen(false)}
          style={{ display: "flex", overflow: "auto" }}
        >
          <Paper
            style={{
              margin: "auto",
              minWidth: 300
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 15,
                padding: "10px 0 10px 10px"
              }}
            >
              <IconButton
                size="small"
                onClick={() => {
                  setIsDateModalOpen(false);
                  setIsStatsModalOpen(true);
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography>Ingresa una fecha</Typography>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                padding: 16
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15
                }}
              >
                <Typography>Desde:</Typography>
                <DatePicker
                  openTo="date"
                  value={startDatePicked}
                  onChange={setStartDatePicked}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15
                }}
              >
                <Typography>Hasta:</Typography>
                <DatePicker
                  openTo="date"
                  value={endDatePicked}
                  onChange={setEndDatePicked}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "auto" }}
              >
                Confirmar
              </Button>
            </div>
          </Paper>
        </Modal>
      </MuiPickersUtilsProvider>

      <div style={{ padding: 10 }}>
        <Card className={classes.fondo}>
          <List className={classes.list}>
            <ListItem>
              <div className={classes.div}>
                <StorefrontIcon className={classes.activos} />
              </div>
              <ListItemText primary="Cantidad de Productos" />
              <Typography
                variant="h5"
                style={{ color: "#FF8000", fontWeight: 500 }}
              >
                $1200
              </Typography>
            </ListItem>
            <ListItem>
              <div className={classes.div}>
                <BusinessCenterIcon className={classes.inactivos} />
              </div>
              <ListItemText primary="Ventas" />
              <Typography
                variant="h5"
                style={{ color: "#367BF5", fontWeight: 500 }}
              >
                $1200
              </Typography>
            </ListItem>
            <ListItem>
              <div className={classes.div}>
                <PaymentIcon className={classes.churn} />
              </div>
              <ListItemText primary="Ingresos" />
              <Typography
                variant="h5"
                style={{ color: "#2FA84F", fontWeight: 500 }}
              >
                $1200
              </Typography>
            </ListItem>
          </List>
        </Card>
      </div>

      <ButtonBase style={{ marginTop: 10, padding: "0 13px" }}>
        <Typography variant="h6" style={{ fontWeight: 500 }}>
          Categorias más vendidos
        </Typography>
      </ButtonBase>
      <div style={{ padding: 10 }}>
        <CardTotal />
      </div>

      <ButtonBase
        style={{
          marginTop: 10,
          padding: "0 13px",
          width: "100%",
          justifyContent: "space-between"
        }}
      >
        <Typography variant="h6" style={{ fontWeight: 500 }}>
          Productos más vendidos
        </Typography>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/products/mostsoldproducts"}
        >
          <Typography variant="h7">Ver más</Typography>
        </Link>
      </ButtonBase>
      <ul className={classes.verticalCardsList}>
        {[1, 2, 3, 4, 5].map((num) => (
          <li key={num}>
            <Link
              to={`/products/productDetails/${num}`}
              style={{ textDecoration: "none" }}
            >
              <ProductCard
                price={1250 * num}
                description="Latex Interior Albalatex Ultra Lavable Blanco "
                imageUrl={`https://source.unsplash.com/500x500/?tool,${num}`}
                stock={15 * num}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SalesTab;
