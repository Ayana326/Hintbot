import admin from "firebase-admin";

const credential = admin.credential.cert({
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_ID_KEY,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
});

if (!admin.apps.length) {
  admin.initializeApp({
    credential: credential,
  });
}

export default admin;
