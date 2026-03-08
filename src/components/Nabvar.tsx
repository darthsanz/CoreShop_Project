import { ShoppingCart, Search, Heart } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useSearchStore } from "../store/searchStore";
import { useFavoriteStore } from "../store/favoriteStore";
import Logo_icon from "../assets/Core_Icon.png";
import type React from "react";

export const Navbar = () => {
  //usamos el intercomunicador, le decimos al gerente que nos diga solo lo que hay en el carrito
  const cart = useCartStore((state) => state.cart);
  const openCart = useCartStore((state) => state.openCart);

  //Leemos los favoritos
  const favorites = useFavoriteStore((state) => state.favorites);
  const totalFavorites = favorites.length;

  //Aqui llamamos al nuevo gerente y a los navegadores de react router
  const { searchTerm, setSearchTerm } = useSearchStore();
  const navigate = useNavigate();
  const location = useLocation();

  //sumamos la cantidad de todos los productos para el num rojo
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  //Esta funcion avisa que estamos buscando y nos regresa al inicio si estabamos en otra pantalla
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo de coreShop */}
          <Link
            to="/"
            className="flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <div className="flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
              <img
                src={Logo_icon}
                alt="CoreShop Icon"
                className="h-10 w-10 mr-1 transform-gpu will-change-transform backface-hidden"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <h1 className="text-3xl font-extrabold text-core-blue tracking-tight">
                Core<span className="text-core-cyan font-medium">Shop</span>
              </h1>
            </div>
          </Link>
          {/* Barra de busqueda */}
          <div className="grow max-w-2xl mx-4">
            <div className="relative group">
              <input
                type="text"
                placeholder="Buscar en CoreShop"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-300 bg-gray-50 focus:bg-white focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 outline-none transition-all shadow-inner group-hover:shadow-md"
              />
              <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400 group-focus-within:text-core-blue transition-colors" />
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/favoritos"
              className="relative p-2 hover:bg-red-50 rounded-full transition-colors"
            >
              <Heart className="h-7 w-7 text-core-text hover:text-red-500 transition-colors" />
              {totalFavorites > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold h-6 w-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-pulse">
                  {totalFavorites}
                </span>
              )}
            </Link>
          </div>

          {/* Icono del carrito con su contador */}
          <div
            onClick={openCart}
            className="relative cursor-pointer p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
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
