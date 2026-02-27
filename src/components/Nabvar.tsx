import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cartStore";

export const Navbar = () => {
  //usamos el intercomunicador, le decimos al gerente que nos diga solo lo que hay en el carrito
  const cart = useCartStore((state) => state.cart);
  //sumamos la cantidad de todos los productos para el num rojo
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo de coreShop */}
          <div className="shrink-0 flex items-center cursor-pointer">
            <h1 className="text-2xl font-bold text-core-blue tracking-tight">
              Core<span className="text-core-cyan">Shop</span>
            </h1>
          </div>
          {/* Icono del carrito con su contador */}
          <div className="relative cursor-pointer p-2 hover:bg-gray-50 rounded-full transition-colors">
            <ShoppingCart className="h-6 w-6 text-core-text" />
            {/* Solo mostramos el globo si hay mas de 0 productos */}
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 --translate-y-1/4 bg-core-cyan rounded-full">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
