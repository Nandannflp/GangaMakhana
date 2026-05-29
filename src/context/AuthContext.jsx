import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateEmail as firebaseUpdateEmail,
  updatePassword as firebaseUpdatePassword,
  updateProfile as firebaseUpdateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  PhoneAuthProvider
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Email/Password signup — also saves user profile to Firestore
  async function signup(email, password, name) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const newProfile = {
      uid: user.uid,
      name: name || '',
      email: email,
      mobile: '',
      photoURL: '',
      createdAt: new Date(),
      theme: 'light',
      notificationsEnabled: true
    };

    await setDoc(doc(db, 'users', user.uid), newProfile);
    setUserProfile(newProfile);

    return userCredential;
  }

  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Success");
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      setUserProfile(null);
      console.log("Logged Out");
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  // Google Sign-In
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Check if user exists in Firestore, if not create profile
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      const newProfile = {
        uid: user.uid,
        name: user.displayName || '',
        email: user.email || '',
        mobile: user.phoneNumber || '',
        photoURL: user.photoURL || '',
        createdAt: new Date(),
        theme: 'light',
        notificationsEnabled: true
      };
      await setDoc(userRef, newProfile);
      setUserProfile(newProfile);
    }
    return result;
  }

  // Phone OTP
  function setupRecaptcha(containerId) {
    // Clear old recaptcha if exists
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      'size': 'invisible',
      'callback': () => {}
    });
    return window.recaptchaVerifier;
  }

  function signInWithPhone(phoneNumber, appVerifier) {
    return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  }

  // Re-authentication
  function reauthenticate(password) {
    if (!currentUser || !currentUser.email) return Promise.reject("No email user");
    const credential = EmailAuthProvider.credential(currentUser.email, password);
    return reauthenticateWithCredential(currentUser, credential);
  }

  // Profile Updates
  async function updateProfileData(data) {
    if (!currentUser) return;
    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, data);
    setUserProfile(prev => ({ ...prev, ...data }));
  }

  function updateEmail(newEmail) {
    if (!currentUser) return;
    return firebaseUpdateEmail(currentUser, newEmail).then(() => {
      return updateProfileData({ email: newEmail });
    });
  }

  function updatePassword(newPassword) {
    if (!currentUser) return;
    return firebaseUpdatePassword(currentUser, newPassword);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user);
        setCurrentUser(user);
        // Fetch detailed profile
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserProfile(userSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user profile", error);
        }
      } else {
        console.log("No user");
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    signInWithGoogle,
    setupRecaptcha,
    signInWithPhone,
    reauthenticate,
    updateProfileData,
    updateEmail,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
