import type { Product } from "../types";
import { useCartStore } from "../store/cartStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavoriteStore } from "../store/favoriteStore";
import { useAuthStore } from "../store/authStore";
import { useTranslation } from "react-i18next";

// EL CADENERO DEL COMPONENTE
// Le decimos a React: "Esta tarjeta NO se dibuja si no le pasas un Producto válido".
interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useTranslation();
  
  //Traemos al usuario actual
  const { user } = useAuthStore();
  const currentUserId = user ? user.uid : "invitado";

  const allFavorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  //verificamos si este producto esta en la lista de este usuario
  const isFavorite = allFavorites.some(
    (fav) => fav.userId === currentUserId && fav.product.id === product.id,
  );

  //USAMOS EL INTERCOMUNICADOR OTRA VEZ
  //Ahora le decimos al gerente, prestame tu funcion de agregar cosas
  const addToCart = useCartStore((state) => state.addToCart); //Aqui le decimos que solo queremos
  // su funcion de añadir al carrito (state.addToCart)

  const handleAddToCart = () => {
    //funciin para gestionar el carrito
    addToCart(product); //1.le avisa al gerente
    //2.lanza el mensaje visual
    toast.success(`${product.title} ${t('common.added_to_cart')}`, {
      iconTheme: {
        primary: "#00B4D8",
        secondary: "#fff",
      },
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-row sm:flex-col group">
      {/* Envolvemos en un nuevo div la imagen y el corazon */}
      <div className="relative w-2/5 sm:w-full sm:h-48 bg-gray-50 shrink-0 flex items-center justify-center">
        <button
          onClick={(e) => {
            e.preventDefault(); //evita que al darle clic al corazon nos mande a detalles
            toggleFavorite(product);
            toast(
              isFavorite ? t("common.removed_from_favorites"): t("common.added_to_favorites"),
              { icon: isFavorite ? "💔" : "❤️" },
            );
          }}
          className="absolute top-2 right-2 z-20 p-2 bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform duration-200"
        >
          <Heart
            className={`h-5 w-5 transition-colors duration-300 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>
        {/* 1. LADO IZQUIERDO (Móvil) / ARRIBA (PC): La Imagen */}
        <Link
          to={`/producto/${product.id}`}
          className="w-full h-full p-2 sm:p-4 shrink-0 flex items-center justify-center cursor-pointer"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-28 w-full sm:h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* 2. LADO DERECHO (Móvil) / ABAJO (PC): La Información */}
      <div className="w-3/5 sm:w-full p-3 sm:p-5 flex flex-col grow justify-between">
        {/* Textos */}
        <Link
          to={`/producto/${product.id}`}
          className="cursor-pointer mb-2 sm:mb-0"
        >
          <h3 className="text-sm sm:text-lg font-bold text-core-text dark:text-gray-100 line-clamp-2 sm:line-clamp-1 group-hover:text-core-blue transition-colors">
            {t(`products.${product.id}.title`, { defaultValue: product.title })}
          </h3>
          <p className="hidden sm:block text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 mb-2">
            {t(`products.${product.id}.description`, {
              defaultValue: product.description,
            })}
          </p>
        </Link>

        {/* Precio y Botón */}
        <div className="mt-auto pt-2 sm:pt-4 flex flex-wrap sm:flex-nowrap items-center justify-between border-t dark:border-t-gray-600 border-transparent sm:border-gray-50 gap-2">
          <span className="text-base sm:text-xl font-extrabold text-core-blue dark:text-white">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-core-blue hover:bg-core-cyan text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-base font-semibold transition-colors duration-200 shadow-md hover:shadow-lg relative z-10 w-full sm:w-auto"
          >
            {t("common.add")}
          </button>
        </div>
      </div>
    </div>
  );
};
