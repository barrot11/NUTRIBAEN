import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAW_Lw6DSRM5BEJGcu8uNYurMDC_FUQv4M",
  authDomain: "knitted-wall-6k91c.firebaseapp.com",
  projectId: "knitted-wall-6k91c",
  storageBucket: "knitted-wall-6k91c.firebasestorage.app",
  messagingSenderId: "804474974276",
  appId: "1:804474974276:web:1b00c3fa5f27b757d40c11"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = initializeFirestore(app, {}, "ai-studio-nutribaen-f734196f-6926-4424-825b-be1347f8b3a5");
