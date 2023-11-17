import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import LeaderBoard from "../components/LearderBoard";
import Reports from "../components/Reports";

export default function DashboardHandler({ currPage }) {
  return (
    <>
      {(() => {
        switch (currPage) {
          case "dashboard":
            return <Dashboard />;
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
