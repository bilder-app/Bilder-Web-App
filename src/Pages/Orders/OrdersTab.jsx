import { Fab } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import OrderCard from "../../Components/OrderCard/OrderCard";
import { useGetAllOrders } from "../../Components/hooks/queries/useGetAllOrders";

const STATES = {
  preparing: "En Preparación",
  ready: "Preparando",
  sent: "Entregado"
};

function OrdersTab() {
  const { data: ordersData, isLoading } = useGetAllOrders();

  return (
    <div>
      {/* <pre>{JSON.stringify(ordersData, null, 2)}</pre> */}
      <ul
        style={{
          listStyleType: "none",
          margin: 0,
          padding: "0",
          paddingTop: 10,
          display: "flex",
          flexDirection: "column",
          gap: 15,
          padding: 20
        }}
      >
        {!isLoading &&
          ordersData.map((order) => {
            const dateObj = new Date(order.createdAt);
            const month = dateObj.getUTCMonth() + 1; //months from 1-12
            const day = dateObj.getUTCDate();
            const year = dateObj.getUTCFullYear();
            let hour = dateObj.getUTCHours() - 3;
            let minutes = dateObj.getUTCMinutes();
            hour = hour < 10 ? "0" + hour : hour;
            minutes = minutes < 10 ? "0" + minutes : minutes;

            return (
              <li>
                <OrderCard
                  number={order.id}
                  date={`${day}/${month}/${year} ${hour}:${minutes}`}
                  status={STATES[order.state]}
                  id={order.id}
                />
              </li>
            );
          })}
      </ul>
      <Fab
        component={Link}
        to="/orders/searchOrders"
        style={{ position: "fixed", bottom: "5rem", right: "2rem" }}
        color="primary"
      >
        <SearchIcon style={{ color: "white" }} />
      </Fab>
    </div>
  );
}

export default OrdersTab;
