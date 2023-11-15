import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <ul>
        <ol>
          <Link to={"login"}>Login</Link>
        </ol>
        <ol>
          <Link to={"register"}>Register</Link>
        </ol>
        <ol>
          <Link to={"dashboard"}>Dashboard</Link>
        </ol>
      </ul>
    </div>
  );
}
