import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types";
import { useAuthStore } from "./authStore";

//Cada fav tiene un gafete
export interface FavoriteItem {
  userId: string;
  product: Product;
}

interface FavoriteState {
  favorites: FavoriteItem[]; //Cambiamos a lista de favoritos
  toggleFavorite: (product: Product) => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (product) => {
        //Preguntamos a seguridad quien esta logueado ahorita
        const currentUser = useAuthStore.getState().user;
        const currentUserId = currentUser ? currentUser.uid : "invitado";

        const currentFavorites = get().favorites;
        //Revisamos si este usuario ya tiene esta producto
        const exists = currentFavorites.some(
          (fav) =>
            fav.userId === currentUserId && fav.product.id === product.id,
        );

        if (exists) {
          //Si ya existe, lo borramos (conservamos todos los demas)
          set({
            favorites: currentFavorites.filter(
              (fav) =>
                !(
                  fav.userId === currentUserId && fav.product.id === product.id
                ),
            ),
          });
        } else {
          //Si no existe. lo lo guardamos con su gafete
          set({
            favorites: [
              ...currentFavorites,
              { userId: currentUserId, product },
            ],
          });
        }
      },
    }),
    {
      name: "coreshop-favorites", // El nombre de la caja fuerte en el navegador
    },
  ),
);
