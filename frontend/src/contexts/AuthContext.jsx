import { createContext, useContext, useState, useEffect } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../services/firebase';
import GoogleSignIn from '../components/GoogleSignIn';

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
        const token = await currentUser.getIdToken();
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
        goolgeSignIn,
        goolgeSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
