import {
  Typography,
  Card,
  CardContent,
  CircularProgress
} from "@material-ui/core";
import ProductCard from "../Components/ProductCard/ProductCard";
import {
  AccountCircle as AccountCircleIcon,
  ChevronLeft as BackIcon
} from "@material-ui/icons";
import Stepper from "./Orders/Stepper.jsx";
import { Link } from "react-router-dom";
import { useGetOrderById } from "../Components/hooks/queries/useGetOrderById";

function OrderDetails({ match: { params }, history }) {
  const { id } = params;
  const { data: orderData, isLoading } = useGetOrderById(id);

  return (
    <div>
      <div
        style={{
          display: "flex",

          alignItems: "center",
          padding: "10px 10px"
        }}
      >
        <BackIcon
          onClick={() => history.goBack()}
          style={{
            width: 30,
            height: 30,
            padding: 0,
            marginRight: 6
          }}
        />
        <Typography variant="h6">#000{params.id}</Typography>
      </div>

      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100
          }}
        >
          <CircularProgress style={{ width: "25%", height: "25%" }} />;
        </div>
      ) : (
        <div style={{ padding: "10px 20px 10px 20px" }}>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 15
            }}
          >
            {orderData.products.map((prod) => {
              return (
                <li key={prod.id}>
                  <Link
                    to={`/products/productDetails/${params.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ProductCard
                      description={prod.name}
                      imageUrl={prod.images[0]}
                      units={prod.BusinessProductInOrder.amount}
                      price={prod.BusinessProductInOrder.price}
                      horizontal
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Total</Typography>
            <Typography variant="h6">
              $
              {orderData.products.reduce(
                (acc, next) =>
                  next.BusinessProductInOrder.amount *
                    next.BusinessProductInOrder.price +
                  acc,
                0
              )}
            </Typography>
          </div>

          <Card
            variant="outlined"
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: 16,
              padding: 5,
              marginTop: 15
            }}
          >
            <AccountCircleIcon style={{ height: 75, width: 75 }} />
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginBottom: -5
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
      )}
    </div>
  );
}

export default OrderDetails;
