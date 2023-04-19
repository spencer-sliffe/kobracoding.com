import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

export function useAuthenticationViewModel() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (user) => {
     setUser(user);
     setIsAuthenticated(!!user);
   });
   return () => {
     unsubscribe();
   };
 }, []);

  async function signIn(email, password) {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");

    try {
      const authResult = await signInWithEmailAndPassword(auth, email, password);
      setUser(authResult.user);
      setIsAuthenticated(true);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function signUp(email, password, confirmPassword) {
    setIsLoading(true); // <-- Add a semicolon here
    setIsError(false);
    setErrorMessage("");

    if (!email || !password || !confirmPassword) {
      setIsError(true);
      setErrorMessage("Please fill out all fields.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setIsError(true);
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const authResult = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(getFirestore(), "Accounts", authResult.user.uid), {
        email,
        subscription: false,
        package: "",
      });
      setUser(authResult.user);
      setIsAuthenticated(true);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  async function signOut() {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    isError,
    errorMessage,
    signIn,
    signUp,
    signOut,
  };
}

export default useAuthenticationViewModel;
