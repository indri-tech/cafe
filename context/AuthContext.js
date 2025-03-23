import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token dari localStorage:", token); // Cek apakah token tersimpan
    if (token) {
      setIsLoggedIn(true);
    }
    console.log("Status Login (AuthContext):", isLoggedIn);
  }, [isLoggedIn]);



  return (
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
      </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}