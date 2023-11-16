import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const PROD = import.meta.env.VITE_ENV === "production";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const AuthContext = createContext({});

export default function AuthProvider(props) {
  const [state, setState] = useState({
    auth: {
      isLoggedIn: false,
      name: "",
      isPremiumUser: false,
    },
    AuthStateUpdater: AuthStateUpdater,
  });

  function AuthStateUpdater(status, name, isPremium) {
    const newState = { ...state };
    newState.auth.isLoggedIn = status;
    newState.auth.name = name;
    newState.auth.isPremiumUser = isPremium;
    setState(newState);
  }

  useEffect(() => {
    async function fetchCurrentSession() {
      const response = await axios.get(PROD ? `${VITE_SERVER_URL}/api/me` : `/api/me`, {
        withCredentials: true,
      });
      if (response.data.success) {
        const updatedState = { ...state };
        updatedState.auth.isLoggedIn = response.data.success;
        updatedState.auth.name = response.data.name;
        updatedState.auth.isPremiumUser = response.data.isPremiumUser;
        setState(updatedState);
      }
    }
    fetchCurrentSession();
  }, []);

  return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>;
}
