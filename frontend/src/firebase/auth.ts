import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import firebaseApp from "./firebase";

export const signin = (email: string, password: string) => {
  const auth = getAuth(firebaseApp);
  return signInWithEmailAndPassword(auth, email, password);
};

export const signup = (email: string, password: string) => {
  const auth = getAuth(firebaseApp);
  console.log(email);
  console.log(password);
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signout = () => {
  const auth = getAuth(firebaseApp);
  return signOut(auth);
};

export const getCurrentUser = (callback: (user: User | null) => void) => {
  const auth = getAuth(firebaseApp);
  onAuthStateChanged(auth, (user: User | null) => {
    callback(user);
  });
};
