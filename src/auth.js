import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

import {
  doc,
  setDoc
} from "firebase/firestore";

import { auth, db } from "./firebase";


// SIGNUP
export const signup = async (
  email,
  password,
  name
) => {

  try {

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user = userCredential.user;

    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        name: name,
        email: email,
        createdAt: new Date()
      }
    );

    alert("Signup Successful");

  } catch (error) {

    alert(error.message);

  }
};


// LOGIN
export const login = async (
  email,
  password
) => {

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Login Successful");

  } catch (error) {

    alert(error.message);

  }
};


// GOOGLE LOGIN
export const googleLogin = async () => {

  try {

    const provider =
      new GoogleAuthProvider();

    const result =
      await signInWithPopup(
        auth,
        provider
      );

    const user = result.user;

    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      },
      { merge: true }
    );

  } catch (error) {

    alert(error.message);

  }
};


// LOGOUT
export const logout = async () => {

  try {

    await signOut(auth);

    alert("Logged Out");

  } catch (error) {

    alert(error.message);

  }
};


// SEND OTP
export const sendOtp = async (phoneNumber) => {

  try {

    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" }
    );

    const formattedPhone = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+91${phoneNumber}`;

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      formattedPhone,
      window.recaptchaVerifier
    );

    window.confirmationResult = confirmationResult;

    alert("OTP Sent!");

  } catch (error) {

    alert(error.message);

  }
};


// VERIFY OTP
export const verifyOtp = async (otp) => {

  try {

    const result = await window.confirmationResult.confirm(otp);

    const user = result.user;

    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        phone: user.phoneNumber,
        createdAt: new Date()
      },
      { merge: true }
    );

    alert("Phone Login Successful");

  } catch (error) {

    alert(error.message);

  }
};
