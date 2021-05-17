import { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import BottomNavigation from "./Components/BottomNavigation/BottomNavigation";
import Orders from "./Pages/Orders/Orders";
import OrderDetails from "./Pages/OrderDetails";
import Login from "./Pages/Login";
import Products from "./Pages/Products/Products";
import NewProduct from "./Pages/Products/NewProduct";
import OrdersSearch from "./Pages/Orders/Search";
import OrdersSearchResults from "./Pages/Orders/Results";
import ProductsSearch from "./Pages/Products/Search";
import ProductDetails from "./Pages/ProductDetails";
import ProductsSearchResults from "./Pages/Products/Results";
import Offers from "./Pages/Offers/";
import NewOffer from "./Pages/Offers/NewOffer";
import OfferDetails from "./Pages/OfferDetails";
import Profile from "./Pages/Profile";
import MyBusiness from "./Pages/MyBusiness";
import EditProduct from "./Pages/EditProduct";
import EditProfile from "./Pages/EditProfile";
import { isLoggedIn } from "./api";

function App() {
  const history = useHistory();
  useEffect(() => {
    isLoggedIn(isLoggedIn).catch(() => history.replace("/"));
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/">
          <Switch>
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/orders/searchOrders" component={OrdersSearch} />
            <Route exact path="/orders/s" component={OrdersSearchResults} />
            <Route
              exact
              path="/orders/orderDetails/:id"
              component={OrderDetails}
            />

            <Route exact path="/products" component={Products} />
            <Route
              exact
              path="/products/searchProducts"
              component={ProductsSearch}
            />
            <Route exact path="/products/s" component={ProductsSearchResults} />
            <Route exact path="/products/newProduct" component={NewProduct} />
            <Route
              exact
              path="/products/productDetails/:id"
              component={ProductDetails}
            />
            <Route
              exact
              path="/products/edit/:productId"
              component={EditProduct}
            />

            <Route exact path="/offers" component={Offers} />
            <Route exact path="/offers/new" component={NewOffer} />
            <Route
              exact
              path="/offers/offerDetails/:id"
              component={OfferDetails}
            />

            <Route exact path="/me" component={Profile} />
            <Route exact path="/me/business" component={MyBusiness} />
            <Route exact path="/me/business/edit" component={EditProfile} />
          </Switch>
          <Route exact path="/:url">
            <div style={{ paddingTop: "4.25rem" }}>
              <BottomNavigation />
            </div>
          </Route>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
