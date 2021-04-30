import { ThemeProvider, createMuiTheme } from "@material-ui/core";

function Theme({ children }) {
  const theme = createMuiTheme({ palette: { primary: { main: "#E49012" } } });
  // const theme = createMuiTheme({ palette: { type: "dark" } });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
