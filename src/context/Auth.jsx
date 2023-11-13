import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider(props) {
  const authCtx = {};
  return <AuthContext.Provider value={authCtx}>{props.children}</AuthContext.Provider>;
}
