import { createContext, useContext, useState, useEffect } from "react";
import AuthenticationViewModel from "./viewModels/AuthenticationViewModel";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authViewModel] = useState(new AuthenticationViewModel());

  useEffect(() => {
    authViewModel.startListening();
    return () => {
      authViewModel.stopListening();
    };
  }, [authViewModel]);

  return <AuthContext.Provider value={authViewModel}>{children}</AuthContext.Provider>;
};
