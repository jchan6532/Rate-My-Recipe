import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [globalError, setGlobalError] = useState({ message: null });

  const login = () => {
    if (!authenticated) setAuthenticated(true);
  };
  const logout = () => {
    if (authenticated) setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
