import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export default function AuthProvider(props) {
  const [state, setState] = useState({
    auth: {
      isLoggedIn: false,
      name: "",
      some: "",
    },
    AuthStateUpdater: AuthStateUpdater,
  });

  function AuthStateUpdater(status, name) {
    const newState = { ...state };
    newState.auth.isLoggedIn = status;
    newState.auth.name = name;
    setState(newState);
  }

  useEffect(() => {
    async function fetchCurrentSession() {
      const response = await axios.get("/api/me", { withCredentials: true });
      if (response.data.success) {
        const updatedState = { ...state };
        updatedState.auth.isLoggedIn = response.data.success;
        updatedState.auth.name = response.data.name;
        setState(updatedState);
      }
    }
    fetchCurrentSession();
  }, []);

  return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>;
}
