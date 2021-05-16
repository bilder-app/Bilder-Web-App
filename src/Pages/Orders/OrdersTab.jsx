import React, { useState, useEffect } from "react";
import { Fab } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import OrderCard from "../../Components/OrderCard/OrderCard";
import { getMyOrders } from "../../api";

function OrdersTab() {

  const [orders, setOrders] = useState([])
  useEffect(() => {
    async function handlerAsync() {
      const refresh = await getMyOrders();
      console.log(refresh)
      setOrders(refresh);
    }
    handlerAsync()
  }, [])

  return (
    <div>
      <ul
        style={{
          listStyleType: "none",
          margin: 0,
          padding: "0",
          paddingTop: 10,
          display: "flex",
          flexDirection: "column",
          gap: 15,
          padding: 13
        }}
      >
        {orders.map((order, index) => (
          <li key={index}>
            <OrderCard data={order} />
          </li>
        ))}
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
