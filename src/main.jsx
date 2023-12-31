import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { extendTheme } from "@chakra-ui/react";

import ExpensesProvider from "./context/Expenses";
import AuthProvider from "./context/Auth";

const theme = extendTheme({
  fonts: {
    heading: "Verdana",
    body: "Candara",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ExpensesProvider>
        <BrowserRouter>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </BrowserRouter>
      </ExpensesProvider>
    </AuthProvider>
  </React.StrictMode>
);
