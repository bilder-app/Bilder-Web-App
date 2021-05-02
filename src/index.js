import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Theme from "./Theme";
import { CssBaseline } from "@material-ui/core";
import ScrollToTop from "./Components/hooks/ScrollToTop";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Theme>
        <ScrollToTop />
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Theme>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
