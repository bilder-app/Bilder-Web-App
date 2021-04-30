import { Fab } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import OrderCard from "../../Components/OrderCard/OrderCard";

function OrdersTab() {
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
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <li>
            <OrderCard
              number="0003"
              date="Abril 5, 2020 - 19:32"
              status="En preparación"
              id={num}
            />
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
