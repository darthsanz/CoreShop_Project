import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

//1.Llamamos al as llaves desde el archivo secreto .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

//2. Despertamos a Firebase
const app = initializeApp(firebaseConfig);

//3.Contratamos al guardia de seguridad (Auth) y preparamos el boton de Google
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
