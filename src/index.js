import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Theme from "./Theme";
import { CssBaseline } from "@material-ui/core";
import ScrollToTop from "./Components/hooks/ScrollToTop";
import { QueryClientProvider, QueryClient } from "react-query";
import { SnackbarProvider } from "notistack";
import FirebaseProvider from "./FirebaseProvider";
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider>
      <Router>
        <Theme>
          <ScrollToTop />
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider>
              <App />
            </SnackbarProvider>
          </QueryClientProvider>
        </Theme>
      </Router>
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
