import "./App.css";
import { useState, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import LeaderBoard from "./components/LearderBoard";
import Reports from "./components/Reports";
import Header from "./components/Header";

import { AuthContext } from "./context/Auth";

function App() {
  const authCtx = useContext(AuthContext);

  const loggedIn = authCtx.auth.isLoggedIn;
  const renderHeader = loggedIn && <Header />;

  return (
    <Box id="dashboard">
      {renderHeader}
      <Routes>
        <Route path="/dashboard">
          <Route index element={!loggedIn ? <Navigate to="/login" /> : <Dashboard />} />
          <Route
            path="leaderboard"
            element={!loggedIn ? <Navigate to="/login" /> : <LeaderBoard />}
          />
          <Route path="reports" element={!loggedIn ? <Navigate to="/login" /> : <Reports />} />
        </Route>
        <Route path="/login" element={loggedIn ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={loggedIn ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}

export default App;
