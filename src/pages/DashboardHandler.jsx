import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import LeaderBoard from "../components/LearderBoard";
import Reports from "../components/Reports";
import Header from "../components/Header";
import { AuthContext } from "../context/Auth";

export default function DashboardHandler() {
  const [currPage, setCurrPage] = useState("dashboard");
  const authCtx = useContext(AuthContext);

  const loggedIn = authCtx.auth.isLoggedIn;

  if (!loggedIn) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <Header currPage={currPage} setCurrPage={setCurrPage} />
      {(() => {
        switch (currPage) {
          case "dashboard":
            return <Dashboard currPage={currPage} setCurrPage={setCurrPage} />;
          case "leaderboard":
            return <LeaderBoard />;
          case "reports":
            return <Reports />;
          default:
            return null;
        }
      })()}
    </>
  );
}
