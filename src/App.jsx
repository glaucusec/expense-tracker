import "./App.css";
import { useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LeaderBoard from "./components/LearderBoard";
import Reports from "./components/Reports";
import Header from "./components/Header";

import ExpensesProvider from "./context/Expenses";
import AuthProvider from "./context/Auth";

function App() {
  const currentPath = window.location.pathname;

  const isLoginPage = currentPath == "/login";
  const isRegisterPage = currentPath == "/register";
  const renderHeader = !isLoginPage && !isRegisterPage && <Header />;

  return (
    <AuthProvider>
      <ExpensesProvider>
        <Box id="dashboard">
          {renderHeader}
          <Routes>
            <Route path="/dashboard">
              <Route index element={<Dashboard />} />
              <Route path="premium" element={<LeaderBoard />} />
              <Route path="reports" element={<Reports />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
      </ExpensesProvider>
    </AuthProvider>
  );
}

export default App;
