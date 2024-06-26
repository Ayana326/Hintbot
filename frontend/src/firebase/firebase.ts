import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSEGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
};

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
export default firebaseApp;
