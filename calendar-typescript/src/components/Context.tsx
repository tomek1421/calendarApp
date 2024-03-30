import React, { createContext, useContext, useState, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  isAuthenticated: {auth: boolean, role: string, username: string};
  login: () => void;
  logout: () => void;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<{ auth: boolean; role: string; username: string; }>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

interface Token {
  role: string,
  unique_name: string
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState({auth: false, role: "", username: ""});

  // !!! dodac useEffecta refactor contextu!!!

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token")

      if (token) {
        const decoded: Token = jwtDecode(token)
        setIsAuthenticated({auth: true, role: decoded.role, username: decoded.unique_name})
      }
    }
  }, [])

  const login = () => {
    // Perform login logic
    const token: any = localStorage.getItem("token")
    const decodedToken: Token = jwtDecode(token)
    setIsAuthenticated({auth: true, role: decodedToken.role, username: decodedToken.unique_name});
  };

  const logout = () => {
    // Perform logout logic
    setIsAuthenticated({auth: false, role: "", username: ""});
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
