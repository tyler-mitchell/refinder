import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./core";
import { useSelector, useDispatch } from "react-redux";
import { initializeUser, selectUserData } from "redux/authSlice";
export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!loading && !error) {
      const data = {
        email: user?.email,
        uid: user?.uid,
        displayName: user?.displayName,
        avatar: user?.photoURL
      };
      dispatch(initializeUser({ userData: data }));
      setUserData(data);
      console.log(`⭐: AuthProvider -> data`, data);
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
