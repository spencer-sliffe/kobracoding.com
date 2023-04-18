import { useState, useEffect } from "react";
import { auth } from '../firebase';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";


class AuthenticationViewModel {
  constructor() {
    this.auth = getAuth();
    this.db = getFirestore();
    this.user = null;
    this.isAuthenticated = false;
    this.isLoading = false;
    this.isError = false;
    this.errorMessage = "";
  }

  async signIn(email, password) {
    this.isLoading = true;
    this.isError = false;
    this.errorMessage = "";

    try {
      const authResult = await signInWithEmailAndPassword(this.auth, email, password);
      this.user = authResult.user;
      this.isAuthenticated = true;
    } catch (error) {
      this.isError = true;
      this.errorMessage = error.message;
    } finally {
      this.isLoading = false;
    }
  }

  async signUp(email, password, confirmPassword) {
    this.isLoading = true;
    this.isError = false;
    this.errorMessage = "";

    if (!email || !password || !confirmPassword) {
      this.isError = true;
      this.errorMessage = "Please fill out all fields.";
      this.isLoading = false;
      return;
    }

    if (password !== confirmPassword) {
      this.isError = true;
      this.errorMessage = "Passwords do not match.";
      this.isLoading = false;
      return;
    }

    try {
      const authResult = await createUserWithEmailAndPassword(this.auth, email, password);
      await setDoc(doc(this.db, "Accounts", authResult.user.uid), {
        email,
        subscription: false,
        package: "",
      });
      this.user = authResult.user;
      this.isAuthenticated = true;
    } catch (error) {
      this.isError = true;
      this.errorMessage = error.message;
    } finally {
      this.isLoading = false;
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
      this.isAuthenticated = false;
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  }

  startListening(onChange) {
    this.unsubscribe = onAuthStateChanged(this.auth, (user) => {
      this.user = user;
      onChange(user);
    });
  }

  stopListening() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

export default AuthenticationViewModel;
