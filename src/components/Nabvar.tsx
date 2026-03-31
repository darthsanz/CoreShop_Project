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
//import type React from "react";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

export const Navbar = () => {
  //extraemos la funcion 't' (para traduccir ) y el objeto 'i18n' (para cambiar de idioma)
  const { t, i18n } = useTranslation();

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
// --Control del menu de icono de perfil--
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  //Efecto para cerrar el menu si el usuario hace clic afuera de el
useEffect(() => {
  // Agregamos TouchEvent para que soporte pantallas táctiles
  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setIsProfileOpen(false);
    }
  };

  //Escucha clics de mouse
  document.addEventListener("mousedown", handleClickOutside);
  //Escucha toques de pantalla celulares etc...
  document.addEventListener("touchstart", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("touchstart", handleClickOutside);
  };
}, []);

  //sumamos la cantidad de todos los productos para el num rojo
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  //Esta funcion avisa que estamos buscando y nos regresa al inicio si estabamos en otra pantalla
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const toggleLanguage = () => {
    const currentBaseLanguage = i18n.language.substring(0, 2);

    const nextLanguage = currentBaseLanguage === "es" ? "en" : "es";
    i18n.changeLanguage(nextLanguage);
  }

  // Extraemos el Input de búsqueda a una variable para no repetir código
  const SearchInput = (
    <div className="relative group w-full">
      <input
        type="text"
        placeholder={t("nav.search_placeholder")}
        value={searchTerm}
        onChange={handleSearch}
        className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-300 dark:border-gray-900 bg-gray-50 dark:bg-gray-600 focus:bg-white dark:focus:bg-gray-600 focus:border-core-blue dark:focus:border-white focus:ring-2 focus:ring-core-blue/20 outline-none transition-all shadow-inner group-hover:shadow-md"
      />
      <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400 group-focus-within:text-core-blue dark:group-focus-within:text-white transition-colors" />
    </div>
  );

  return (
    <nav className="bg-gray-300/80 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* === FILA PRINCIPAL === */}
        <div className="flex justify-between items-center h-16 gap-2 sm:gap-4">
          {/* Logo de coreShop, izq */}
          <Link
            to="/"
            className="flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <div className="flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
              <img
                src={Logo_icon}
                alt="CoreShop Icon"
                className="h-10 w-10 sm:mr-1 transform-gpu will-change-transform backface-hidden"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <h1 className="text-3xl font-extrabold text-core-blue tracking-tight dark:text-white">
                Core<span className="text-core-cyan font-medium">Shop</span>
              </h1>
            </div>
          </Link>

          {/* Barra de busqueda , centro y oculta en moviles*/}
          <div className="hidden md:block grow max-w-2xl mx-4">
            {SearchInput}
          </div>

          {/* CONTENEDOR DE ICONOS DERECHA (Derecha) -> Agrupados para no desbordar */}
          <div className="flex items-center justify-end gap-1 sm:gap-3 shrink-0">
            {/* Perfil/Login */}
            {user ? (
              <div ref={profileRef} className="relative">
                {/* BOTÓN GATILLO DEL PERFIL */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 sm:p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer border-none bg-transparent outline-none text-left"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-core-blue to-core-cyan text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="hidden lg:block text-sm mr-2">
                    <p className="text-gray-500 dark:text-gray-300 text-[10px] leading-none mb-0.5">
                      {t("nav.greeting")},
                    </p>
                    <p className="font-bold text-gray-800 dark:text-white line-clamp-1 max-w-25 leading-tight">
                      {user.displayName || user.email?.split("@")[0]}
                    </p>
                  </div>
                </button>

                {/* MENÚ FLOTANTE */}
                <div
                  className={`absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-600 transition-all duration-200 z-50 origin-top-right ${
                    isProfileOpen
                      ? "opacity-100 visible scale-100"
                      : "opacity-0 invisible scale-95"
                  }`}
                >
                  <div className="p-2 flex flex-col gap-1">
                    <Link
                      to="/mis-compras"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-core-blue dark:hover:text-gray-200 font-bold rounded-xl transition-colors"
                    >
                      <Package className="h-4 w-4" />
                      {t("nav.my_orders")}
                    </Link>
                    <div className="h-px bg-gray-100 dark:bg-gray-600 my-1 mx-2"></div>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-white hover:bg-red-50 dark:hover:bg-red-500/20 font-bold rounded-xl transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      {t("nav.logout")}
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
                  {t("nav.login")}
                </span>
              </Link>
            )}

            {/* Divisor visual entre perfil y los iconos */}
            <div className="hidden sm:block h-6 w-px bg-gray-200 mx-1"></div>

            {/* EL BOTÓN DE IDIOMA */}
            <button
              onClick={toggleLanguage}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-300 font-bold text-sm uppercase"
            >
              {i18n.language.substring(0,2).toUpperCase()}
            </button>

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
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-core-cyan rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>
        {/* === FILA SECUNDARIA (BUSCADOR SOLO PARA MÓVILES) === */}
        {/* Aparece debajo de los iconos solo en pantallas menores a 'md' */}
        <div className="block md:hidden pb-3 mt-1">{SearchInput}</div>
      </div>
    </nav>
  );
};;
