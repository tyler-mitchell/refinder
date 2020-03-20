import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./core";
export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  console.log(`⭐: AuthProvider -> error`, error);
  console.log(`⭐: AuthProvider -> loading`, loading);

  const [userData, setUserData] = React.useState(false);

  React.useEffect(() => {
    if (!loading && !error) {
      const data = {
        email: user.email,
        uid: user.uid,
        name: user.displayName,
        avatar: user.photoURL
      };
      setUserData(data);
    }
  }, [loading, error]);

  const login = () => {
    auth().signInWithEmailAndPassword("test@test.com", "password");
  };
  const logout = () => {
    auth().signOut();
  };

  const ctx = {
    //signup
    userData,

    login,
    logout
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
