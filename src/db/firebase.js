import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);

export const getLogin = (onSuccess) => {
  const auth = getAuth();
  onAuthStateChanged(auth, onSuccess);
};

export const logout = async () => {
  const auth = getAuth();
  await signOut(auth);
};
