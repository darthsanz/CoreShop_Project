import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./cartStore";

//Definimos como se ve un ticket de compra (orden)
export interface Order {
  id: string;
  userId: string; //Guardamos el id del usuario para saber de quien es la compra
  date: string;
  items: CartItem[];
  total: number;
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      //Agregamos la nueva orden al principio de la lista (Para que las mas nuevas salgan arriba )
      addOrder: (order) => set({ orders: [order, ...get().orders] }),
    }),
    { name: "coreshop-orders" },
  ),
);
