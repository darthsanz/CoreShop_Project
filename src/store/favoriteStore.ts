import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types";

interface FavoriteState {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (product) => {
        const currentFavorites = get().favorites;
        const exists = currentFavorites.some((p) => p.id === product.id);

        if (exists) {
          //Si ya existe, lo filtramos(lo borramos)
          set({
            favorites: currentFavorites.filter((p) => p.id !== product.id),
          });
        } else {
          //Si no existe. lo agregamos a la lista
          set({ favorites: [...currentFavorites, product] });
        }
      },
    }),
    {
      name: "coreshop-favorites", // El nombre de la caja fuerte en el navegador
    },
  ),
);
