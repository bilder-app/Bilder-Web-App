import { useState } from "react";
import { Tabs, Tab, Paper, useScrollTrigger } from "@material-ui/core";
import OrdersTab from "./OrdersTab";
import SalesTab from "./SalesTab";
import { useHistory } from "react-router-dom";

function Orders() {
  const history = useHistory();
  const [tabState, setTabState] = useState(() =>
    history.location.hash.split("#").length > 1 ? 1 : 0
  );

  const handleChange = (event, newValue) => {
    setTabState(newValue);
  };

  const isScrolling = useScrollTrigger({
    disableHysteresis: true,
    threshold: 13
  });

  return (
    <div>
      <Paper
        elevation={isScrolling ? 4 : 0}
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1
        }}
      >
        <Tabs
          style={{ display: "flex" }}
          value={tabState}
          onChange={handleChange}
          indicatorColor="primary"
        >
          <Tab
            onClick={() => history.replace("#")}
            style={{ flexGrow: 1, maxWidth: "initial" }}
            label="Ventas"
          />
          <Tab
            onClick={() => history.replace("#all")}
            style={{ flexGrow: 1, maxWidth: "initial" }}
            label="Pedidos"
          />
        </Tabs>
      </Paper>
      <div style={{ paddingTop: 50 }} />
      <div>{tabState === 0 ? <SalesTab /> : <OrdersTab />}</div>
    </div>
  );
}

export default Orders;
