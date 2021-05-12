import { Typography, Card, CardContent } from "@material-ui/core";
import ProductCard from "../Components/ProductCard/ProductCard";
import {
  AccountCircle as AccountCircleIcon,
  ChevronLeft as Backicon,
} from "@material-ui/icons";
import Stepper from "./Orders/Stepper.jsx";
import { Link } from "react-router-dom";

function OrderDetails({ match: { params }, history }) {
  return (
    <div style={{ padding: 20, backgroundColor: "white" }}>
      <div style={{ display: "flex", marginBottom: 10, alignItems: "center" }}>
        <Backicon
          onClick={() => history.goBack()}
          style={{
            border: "2px solid black",
            borderRadius: "50%",
            width: 25,
            height: 25,
            padding: 0,
            marginRight: 8,
          }}
        />
        <Typography variant="h6">#000{params.id}</Typography>
      </div>

      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <li>
          <Link
            to={`/products/productDetails/${params.id}`}
            style={{ textDecoration: "none" }}
          >
            <ProductCard
              description={"Hierro estructural 20 x 20,espesor 1,2mm"}
              imageUrl={"https://source.unsplash.com/500x500/?tool,shed"}
              price={1200}
              units={5}
              horizontal
            />
          </Link>
        </li>
        <li>
          <Link
            to={`/products/productDetails/${params.id}`}
            style={{ textDecoration: "none" }}
          >
            <ProductCard
              description={"Hierro estructural 20 x 20,espesor 1,2mm"}
              imageUrl={"https://source.unsplash.com/500x500/?tool,shed"}
              price={1200}
              units={5}
              horizontal
            />
          </Link>
        </li>
        <li>
          <Link
            to={`/products/productDetails/${params.id}`}
            style={{ textDecoration: "none" }}
          >
            <ProductCard
              description={"Hierro estructural 20 x 20,espesor 1,2mm"}
              imageUrl={"https://source.unsplash.com/500x500/?tool,shed"}
              price={1200}
              units={5}
              horizontal
            />
          </Link>
        </li>
      </ul>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        <Typography>Subtotal</Typography>
        <Typography variant="h6">$4400</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Retiro en el lugar</Typography>
        <Typography variant="h6">$0</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Total</Typography>
        <Typography variant="h6">$4400</Typography>
      </div>

      <Card
        variant="outlined"
        style={{
          display: "flex",
          alignItems: "center",
          borderRadius: 16,
          padding: 5,
          marginTop: 15,
        }}
      >
        <AccountCircleIcon style={{ height: 75, width: 75 }} />
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginBottom: -5,
          }}
        >
          <Typography style={{ fontWeight: 600 }}>Diego Lopez</Typography>
          <Typography style={{ fontWeight: 600 }}>
            Contacto: 1154829220
          </Typography>
        </CardContent>
      </Card>

      <Stepper />
    </div>
  );
}

export default OrderDetails;
