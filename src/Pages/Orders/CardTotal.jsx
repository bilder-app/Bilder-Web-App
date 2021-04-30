import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { PieChart, Pie, Sector, Cell } from "recharts"; //npm install recharts
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Divider, ListItem } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

const useStyles = makeStyles((theme) => ({
  fondo: {
    borderRadius: "20px",
    height: "185px",
  },
  title: {
    fontSize: 16,
    color: "#707070",
  },
  contenedor: {
    display: "flex",
    flexDirection: "row",
    height: "150px",

    justifyContent: "center",
  },
  activos: {
    color: "#2ED47A",
  },
  inactivos: {
    color: "#FFB946",
  },
  churn: {
    color: "#F7685B",
  },
  azul: {
    color: "#367BF5",
  },
  list: {
    height: "100%",
    display: "flex",

    flexDirection: "column",
    justifyContent: "center",
  },
}));

function CardTotal() {
  const classes = useStyles();
  const data = [
    { name: "Group a", value: 600 },
    { name: "Group d", value: 500 },
    { name: "Group c", value: 300 },
    { name: "Group d", value: 200 },
  ];
  const COLORS = ["#2ED47A", "#F7685B", "#FFB946", "#367BF5"];

  return (
    <Card className={classes.fondo}>
      <CardContent>
        <div className={classes.contenedor}>
          <PieChart width={150} height={150}>
            <Pie
              data={data}
              cx={70}
              cy={70}
              innerRadius={35}
              outerRadius={70}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>

          <List className={classes.list}>
            <ListItem>
              <RadioButtonUncheckedIcon className={classes.activos} />
              <ListItemText primary="Pinturas" />
            </ListItem>
            <ListItem>
              <RadioButtonUncheckedIcon className={classes.churn} />
              <ListItemText primary="Electricidad" />
            </ListItem>
            <ListItem>
              <RadioButtonUncheckedIcon className={classes.inactivos} />
              <ListItemText primary="Construcción" />
            </ListItem>
            <ListItem>
              <RadioButtonUncheckedIcon className={classes.azul} />
              <ListItemText primary="Ferreteria" />
            </ListItem>
          </List>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardTotal;
