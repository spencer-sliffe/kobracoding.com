import { createContext, useContext, useState } from "react";
import useAuthenticationViewModel from "./viewModels/useAuthenticationViewModel";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const authViewModel = useAuthenticationViewModel();

  return (
    <AuthContext.Provider value={authViewModel}>{children}</AuthContext.Provider>
  );
};
