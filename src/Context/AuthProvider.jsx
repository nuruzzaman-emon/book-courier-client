import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, setProfileRevision] = useState(0);

  //create user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //login user
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //login by google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //update profile
  const updateUserProfile = async (userInfo) => {
    await updateProfile(auth.currentUser, userInfo);
    setProfileRevision((revision) => revision + 1);
  };

  const changeUserPassword = async (currentPassword, newPassword) => {
    const currentUser = auth.currentUser;
    if (!currentUser?.email) {
      throw new Error("A signed-in email account is required to change password.");
    }
    if (
      !currentUser.providerData.some(
        (provider) => provider.providerId === "password",
      )
    ) {
      throw new Error(
        "This account does not have an email password. Sign in with your account provider instead.",
      );
    }

    const credential = EmailAuthProvider.credential(
      currentUser.email,
      currentPassword,
    );
    await reauthenticateWithCredential(currentUser, credential);
    await updatePassword(currentUser, newPassword);
  };

  //forget password
  const forgetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  //sign out user
  const signOutUser = () => {
    return signOut(auth);
  };

  //manage state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    updateUserProfile,
    changeUserPassword,
    forgetPassword,
    signOutUser,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
