import { createContext, useContext, useState, useEffect } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../services/firebase';

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [globalError, setGlobalError] = useState({ message: null });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setAuthenticated(false);
        return;
      }

      try {
        //const token = await currentUser.getIdToken();
        setUser(currentUser);
        setAuthenticated(true);
      } catch (error) {
        setUser(null);
        setAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const goolgeSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  const goolgeSignOut = async () => {
    signOut(auth);
    setUser(null);
  };
  const login = () => {
    setAuthenticated(true);
    setUser({ name: 'john doe', email: 'johndoe@gmail.com' });
  };
  const logout = () => {
    setAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        globalError,
        login,
        logout,
        goolgeSignIn,
        goolgeSignOut,
        setGlobalError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
