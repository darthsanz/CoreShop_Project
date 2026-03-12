import { create } from "zustand";
import {
  type User,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import toast from "react-hot-toast";

interface AuthState {
  user: User | null; //Aqui guardaremos la foto, nombre y correo.
  loading: boolean; //Para saber si Firebase sigue buscando al usuario
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  //funciones para correo
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true, //Empezamos en true mientras firebase revisa si ya estabas logueado
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  //Funcion para abrir la ventanita de google
  loginWithGoogle: async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("¡Bienvenido a Coreshop!");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error("Hubo un error al iniciar sesión");
    }
  },

  //Funcion para entrar con correo que ya existe
  loginWithEmail: async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Bienvenido de vuelta!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Correo o contraseña incorrectos");
    }
  },

  //Funcion para crear nueva cuenta con correo
  registerWithEmail: async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("¡Cuenta creada con exito!");
    } catch (error) {
      console.error("Error:", error);
      //Le damos un molde temporal al error solo para esta parte
      const firebaseError = error as { code: string };
      //Firebase nos avisa si la contraseña es muy debil o el correo ya existe
      if (firebaseError.code === "auth/weak-password") {
        toast.error("La contraseña debe tener al menos 6 caracteres");
      } else if (firebaseError.code === "auth/email-already-in-use") {
        toast.error("Este correo ya está registrado");
      } else {
        toast.error("Hubo un error al registrarse");
      }
    }
  },

  //Funcion para cerrar sesión
  logout: async () => {
    try {
      await signOut(auth);
      toast.success("Sesión cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  },
}));
