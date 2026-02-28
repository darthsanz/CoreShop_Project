import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types";

// 1. EL MOLDE DEL CARRITO
// Un "CartItem" es exactamente igual a un Producto, pero le agregamos
// la propiedad "quantity" (cantidad) para saber cuántos se lleva el usuario.
export interface CartItem extends Product {
  quantity: number;
}

//2.EL MOLDE DEL CEREBRO (Zustand)
//Aqui le decimos a typescript que datos y que funciones tendra nuestro cerebro
interface CartState {
  isCartOpen: boolean; //Estado visual del panel
  cart: CartItem[]; //Una lista de articulos en el carrito
  addToCart: (product: Product) => void; //Funcion para agregar
  removeFromCart: (productId: number) => void; //Funcion para quitar
  clearCart: () => void; //Funcion para vaciar el carrito
  openCart: () => void;
  closeCart: () => void;
}

//3. LA CREACION DEL CEREBRO
//Usamos "create<CartState>" para obligar a Zustand a respetar el moolde de arriba
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      isCartOpen: false, //por defecto el panel comienza cerrado
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === product.id,
          );
          if (existingItem) {
            //si ya existe, recorremos el carrito y le sumamos 1 a la cantidad de ese producto
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          //Si es un producto nuevo, lo metemos a la lista con cantidad: 1
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
      //Logica para remover un producto completo del carrito
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      //Logica para vaciar todo  (ideal para cuando el usuario termina de pagar)
      clearCart: () => set({ cart: [] }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
    }),
    {
      name: "coreshop-cart-storage",
    },
  ),
);
