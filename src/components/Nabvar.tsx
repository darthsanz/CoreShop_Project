import {
  ShoppingCart,
  Search,
  Heart,
  User,
  LogOut,
  Package,
  Sun,
  Moon,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useSearchStore } from "../store/searchStore";
import { useFavoriteStore } from "../store/favoriteStore";
import Logo_icon from "../assets/Core_Icon.png";
import type React from "react";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";

export const Navbar = () => {
  //usamos el intercomunicador, le decimos al gerente que nos diga solo lo que hay en el carrito
  const cart = useCartStore((state) => state.cart);
  const openCart = useCartStore((state) => state.openCart);

  //Leemos quién está logueado y traemos la función de cerrar sesión
  const { user, logout } = useAuthStore();
  const currentUserId = user ? user.uid : "invitado";

  //Control remoto de la luz
  const { isDarkMode, toggleTheme } = useThemeStore();

  //filtamos lalista de favoritos para contar solo los de quien este logueado
  const allFavorites = useFavoriteStore((state) => state.favorites);
  const myFavorites = allFavorites.filter(
    (fav) => fav.userId === currentUserId,
  );
  const totalFavorites = myFavorites.length;

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
    <nav className="bg-gray-300/80 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
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
              <h1 className="text-3xl font-extrabold text-core-blue tracking-tight dark:text-white">
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
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-300 dark:border-gray-900 bg-gray-50 dark:bg-gray-600 focus:bg-white dark:focus:bg-gray-600 focus:border-core-blue dark:focus:border-white focus:ring-2 focus:ring-core-blue/20 outline-none transition-all shadow-inner group-hover:shadow-md"
              />
              <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400 group-focus-within:text-core-blue dark:group-focus-within:text-white transition-colors" />
            </div>
          </div>
          {/* Perfil/Login */}
          {user ? (
            //Si el usuario esta logueado
            <div className="relative group cursor-pointer flex items-center gap-2 p-1 sm:p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              {/* Mostramos su foto de google o la inicial de su correo */}
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-gray-200 object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-core-blue to bg-core-cyan text-white flex items-center justify-center font-bold text-sm ">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              )}
              {/* Nombre, solo visibles apartir de pantallas medianas */}
              <div className="hidden md:block text-sm text-left mr-2">
                <p className="text-gray-500 dark:text-gray-300 text-xs leading-none">
                  Hola,{" "}
                </p>
                <p className="font-bold text-gray-800 dark:text-white line-clamp-1 max-w-25 leading-tight mt-0.5]">
                  {user.displayName || user.email?.split("@"[0])}
                </p>
              </div>

              {/* Menu flotante para cerrar sesion */}
              <div className="absolute top-full right-0 mt-1 w-40 bg-white dark:bg-gray-600 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-900 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2 flex flex-col gap-1">
                  {/* Boton de mis compras */}
                  <Link
                    to="/mis-compras"
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-white  hover:bg-gray-50 dark:hover:bg-blue-600/80 hover:text-core-blue dark:hover:text-gray-200 font-bold rounded-xl transition-colors"
                  >
                    <Package className="h-4 w-4" />
                    Mis compras
                  </Link>

                  {/* Divisor */}
                  <div className="h-px bg-gray-100 my-1 mx-2"></div>

                  {/* Boton de salir */}
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-white hover:bg-red-50 dark:hover:bg-red-600/80 font-bold rounded-xl transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Salir
                  </button>
                </div>
              </div>
            </div>
          ) : (
            //si el usuario no esta logueado
            <Link
              to="/login"
              className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-full sm:rounded-xl transition-colors text-gray-600 dark:text-gray-100 hover:text-core-blue dark:hover:text-core-cyan"
            >
              <User className="h-7 w-7 sm:h-6 sm:w-6" />
              <span className="hidden md:inline text-sm font-bold">
                Ingresar
              </span>
            </Link>
          )}

          {/* Divisor visual entre perfil y los iconos */}
          <div className="hidden sm:block h-6 w-px bg-gray-200 mx-1"></div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/favoritos"
              className="relative p-2 hover:bg-red-50 dark:hover:bg-gray-600 rounded-full transition-colors"
            >
              <Heart className="h-7 w-7 text-core-text dark:text-gray-100 hover:text-red-500 transition-colors" />
              {totalFavorites > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold h-6 w-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-pulse">
                  {totalFavorites}
                </span>
              )}
            </Link>
          </div>
          {/* Interruptor del modo oscuro */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors text-gray-600 dark:text-gray-300"
          >
            {isDarkMode ? (
              <Sun className="h-6 w-6" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </button>

          {/* Icono del carrito con su contador */}
          <div
            onClick={openCart}
            className="relative cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-full transition-colors"
          >
            <ShoppingCart className="h-6 w-6 text-core-text dark:text-gray-100" />
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
