import type { Product } from "../types";
import { useCartStore } from "../store/cartStore";
import toast from "react-hot-toast";

// EL CADENERO DEL COMPONENTE
// Le decimos a React: "Esta tarjeta NO se dibuja si no le pasas un Producto válido".
interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  //USAMOS EL INTERCOMUNICADOR OTRA VEZ
  //Ahora le decimos al gerente, prestame tu funcion de agregar cosas
  const addToCart = useCartStore((state) => state.addToCart); //Aqui le decimos que solo queremos
  // su funcion de añadir al carrito (state.addToCart)
  const handleAddToCart = () => {
    addToCart(product); //1.le avisa al gerente
    //2.lanza el mensaje visual
    toast.success(`!${product.title} agregado al carrito`, {
      style: {
        background: "#1E293B",
        color: "#fff",
        borderRadius: "10px",
      },
      iconTheme: {
        primary: "#00B4D8",
        secondary: "#fff",
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
      {/* Foto del producto */}
      <div className="h-48 w-full bg-gray-50 p-4 cursor-pointer">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain mix-blend-multiply"
        />
      </div>
      {/* Informacion del producto */}
      <div className="p-5 flex flex-col grow">
        <h3 className="text-lg font-bold text-core-text line-clamp-1">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 grow">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-extrabold text-core-blue">
            ${product.price}
          </span>
          {/* BOTON MAGICO */}
          {/* Al hacer click llamamos la funciond el gerente y le damos este producto exactp */}
          <button
            onClick={handleAddToCart}
            className="bg-core-blue hover:bg-core-cyan text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};
