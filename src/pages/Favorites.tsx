import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { useFavoriteStore } from "../store/favoriteStore";
import { ProductCard } from "../components/ProductCard";
import { useAuthStore } from "../store/authStore";

export const Favorites = () => {
  const { user } = useAuthStore();
  const currentUserId = user ? user.uid : "invitado";

  const allFavorites = useFavoriteStore((state) => state.favorites);
  //Extraemos solo los productos de las cajas con el nombre de la cuenta logueada
  const myFavoriteProducts = allFavorites
    .filter((fav) => fav.userId === currentUserId)
    .map((fav) => fav.product);

  //Si no hay favoritos mostramos un mensaje
  if (myFavoriteProducts.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-core-bg dark:bg-gray-950 animate-fade-in">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-full shadow-sm mb-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <Heart className="h-24 w-24 text-gray-300 dark:text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Tu lista de deseos está vacía 💔
        </h2>
        <p className="text-gray-500 dark:text-gray-300 mb-8 text-center max-w-md">
          ¡Explora nuestro catálogo y enamórate de nuestros increíbles
          productos!
        </p>
        <Link
          to="/"
          className="bg-core-blue text-white py-4 px-8 rounded-xl font-bold hover:bg-core-cyan transition-colors shadow-lg hover:shadow-core-cyan/50"
        >
          Descubrir productos
        </Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-core-bg dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-gray-500 dark:text-gray-100 hover:text-core-blue dark:hover:text-core-cyan transition-colors mb-8 font-semibold"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a la tienda
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-red-500 fill-red-500" />
          <h1 className="text-3xl font-extrabold text-core-text dark:text-gray-100">
            Tus Favoritos
          </h1>
        </div>
        {/* Reutilizamos el grid y las tarjetas */}
        <div className="grid grid-cols-1 sm:grind-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myFavoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
