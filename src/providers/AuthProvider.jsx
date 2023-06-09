/* eslint-disable react/prop-types */
import axios from "axios";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const token = localStorage.getItem("token");
        if (!token) {
          await saveAccessToken(currentUser.email);
        }
        setLoading(false);
      } else setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const registerUserInBackend = async () => {
    const res = await axios.post("http://localhost:5000/api/users", {
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    return res.data;
  };

  const saveAccessToken = async (email) => {
    const res = await axios.post("http://localhost:5000/jwt", { email });
    if (res.data.token) localStorage.setItem("token", res.data.token);
  };

  const clearAccessToken = () => {
    localStorage.removeItem("token");
  };

  const createUser = async (displayName, photoURL, email, password) => {
    try {
      setLoading(true);
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName, photoURL });
      const json = await registerUserInBackend();
      if (json.insertedId) {
        setUser((user) => ({ ...user, displayName, photoURL }));
        await saveAccessToken(email);
        return { message: "Register successful!" };
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      await saveAccessToken(email);
      return { message: "Login successful!" };
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const result = await registerUserInBackend();
      if (!result.error) {
        await saveAccessToken(auth.currentUser.email);
        return { message: "Login successful!" };
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    try {
      setLoading(true);
      setError(null);
      clearAccessToken();
      return signOut(auth);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const userInfo = {
    user,
    loading,
    error,
    createUser,
    loginUser,
    loginWithGoogle,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
