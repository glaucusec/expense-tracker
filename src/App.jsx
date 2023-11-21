import "./App.css";
import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import DashboardHandler from "./pages/DashboardHandler";

import { AuthContext } from "./context/Auth";

import ForgotPassword from "./components/forgotpassword/ForgotPassword";

function App() {
  const authCtx = useContext(AuthContext);

  const loggedIn = authCtx.auth.isLoggedIn;

  return (
    <Box id="dashboard">
      <Routes>
        <Route path="/dashboard" element={<DashboardHandler />}></Route>
        <Route path="/login" element={loggedIn ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={loggedIn ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}

export default App;
