import React, { useEffect, useState } from "react"; 
import { Typography, Card, CardContent } from "@material-ui/core";
import ProductCard from "../Components/ProductCard/ProductCard";
import {
  AccountCircle as AccountCircleIcon,
  ChevronLeft as BackIcon,
} from "@material-ui/icons";
import Stepper from "./Orders/Stepper.jsx";
import { Link } from "react-router-dom";
import { getOrderById } from "../api"


function OrderDetails({ match: { params }, history }) {
  const [order, setOrder] = useState();
  useEffect(() => {
    async function handlerAsync() {
      const refresh = await getOrderById(params.id);
      setOrder(refresh);
    }
    handlerAsync()
  }, [])

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 10px",
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
        <Typography variant="h6">#000{params.id}</Typography>
      </div>
      <div style={{ padding: "10px 20px 10px 20px" }}>
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
        
        {order && order.products.map(({ images, description, ProductInOrder }, index) => {
          const { price, amount, productId } = ProductInOrder;
          return(
            <li key={index}>
              <Link
                to={`/products/productDetails/${productId}`}
                style={{ textDecoration: "none" }}
              >
                <ProductCard
                  price={price}
                  units={amount}
                  description={description}
                  imageUrl={images[0]}
                  horizontal
                />
              </Link>
            </li>
          )
        })}

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
    </div>
  );
}

export default OrderDetails;
