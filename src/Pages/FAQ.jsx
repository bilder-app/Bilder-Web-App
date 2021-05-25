import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { AppBar, IconButton, Toolbar, useTheme } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ChevronLeft as BackIcon } from "@material-ui/icons";
import AppBarHeader from "../Components/AppBarHeader/AppBarHeader";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    },
    backgroundColor: "#fff",
    border: "none",
    borderBottom: "1px solid #ddd",
    paddingTop: 0,
    height: "3.5rem",
    width: "100%"
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    width: "100vh",
    padding: 0,
    margin: 0
  },
  button: {
    height: "100%",
    padding: 13,
    margin: "auto",
    width: "15%"
  },
  data: {
    fontSize: 15,
    color: "#666",
    fontWeight: "normal"
  }
});

function createData(question, data) {
  return {
    question,
    data
  };
}

function Row(props) {
  const { row, open, setOpen, index } = props;
  const classes = useRowStyles();
  return (
    <>
      <TableRow
        component="button"
        onClick={() => {
          open === index ? setOpen(-1) : setOpen(index);
        }}
        classes={{ root: classes.root }}
      >
        <TableCell classes={{ root: classes.button }}>
          {open === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </TableCell>
        <TableCell component="th" classes={{ root: classes.text }} scope="row">
          {row.question}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open === index} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                variant="h6"
                classes={{ root: classes.data }}
                gutterBottom
                component="div"
              >
                {row.data}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const answer =
  "El Balance es el apartado en donde podrás encontrar el resumen de tu negocio. Allí tienes la opción de ver la utilidad total de tu negocio, teniendo en cuenta las ventas y gastos de manera separada. Esta información contiene únicamente las ventas y gastos que han sido pagados, es decir, tus transacciones pendientes por recibir o por pagar no saldrán afectando tu utilidad. Esta información puedes verla diaria, semanal, mensual o de acuerdo al rango de fecha que escojas. Igualmente, muestra las transacciones por fecha desde la más reciente a la primera transacción registrada.";
const rows = [
  createData("¿Qué es el balance?", answer),
  createData("¿Cómo puedo crear un producto nuevo?", answer),
  createData("¿Cómo puedo editar o eliminar un producto?", answer),
  createData("¿Para qué sirve el estado de una orden?", answer),
  createData("¿Cómo puedo editar la información de mi negocio?", answer),
  createData("¿Qué información puedo encontrar en Perfil?", answer),
  createData(
    "¿Cómo puedo crear y compartir mi tarjeta de contacto virtual?",
    answer
  ),
  createData("¿Cómo puedo cerrar sesión?", answer)
];

export default function CollapsibleTable() {
  const [open, setOpen] = React.useState();
  const theme = useTheme();

  return (
    <div>
      <AppBarHeader backTo="/me">
        <Typography variant="h6">Preguntas frequentes</Typography>
      </AppBarHeader>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {rows.map((row, index) => (
              <Row
                key={index}
                row={row}
                setOpen={setOpen}
                open={open}
                index={index}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
