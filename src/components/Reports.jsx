import React, { useState } from "react";
import ReportDownload from "./reports/ReportDownload";
import ReportHistory from "./reports/ReportHistory";

export default function Reports() {
  return (
    <React.Fragment>
      <ReportDownload />
      <ReportHistory />
    </React.Fragment>
  );
}
