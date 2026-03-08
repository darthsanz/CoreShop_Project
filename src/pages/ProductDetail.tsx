import { useParams, Link, useNavigate } from "react-router-dom"; //este lee la url, link nospermite regresar al inicio
import { ArrowLeft, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

import { getProductsById } from "../services/product";
import { useCartStore } from "../store/cartStore";
import type { Product } from "../types";
import { useEffect, useState } from "react";

export const ProductDetail = () => {
  //Leemos el ID directamente de la URL (ej. si es /producto/5, id será "5")
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  //Traemos el gerente para poder agregar cosas desde esta pantalla
  const addToCart = useCartStore((state) => state.addToCart);
  //Cuando la pagina carga, mandamos al repartidor por este producto especifico
  useEffect(() => {
    const fetchSingleProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getProductsById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error cargando detalle:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    toast.success(`¡${product.title} agregado al carrito!`, {
      style: { background: "#1E293B", color: "#fff", borderRadius: "10px" },
      iconTheme: { primary: "#00B4D8", secondary: "#fff" },
    });
  };
  //Pantalla de carga
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-core-bg">
        <p className="text-xl text-core-blue font-semibold animate-pulse">
          Cargando detalles del producto...
        </p>
      </div>
    );
  }
  //Si por alguna razon el producto no existe (Error 404)
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-core-bg">
        <h2 className="text-2xl font-bold text-gray-800">
          Producto no encontrado
        </h2>
        <Link
          to="/"
          className="mt-4 text-core-blue hover:text-core-cyan underline font-semibold"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-core-bg py-7 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Botón para regresar al catálogo */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-500 hover:text-core-blue transition-colors mb-1 md:mb-8 font-semibold cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver
        </button>
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Lado izquierdo: la foto gigante */}
          <div className="md:w-1/2 bg-gray-50 p-1 md:p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-auto max-h[500px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Lado derecho: la Informacion y compra */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="uppercase tracking-wide text-sm text-core-cyan font-bold mb-2">
              {product.category.replace("-", " ")}
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-core-text mb-4">
              {product.title}
            </h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-8">
                <span className="text-3xl md:text-5xl font-extrabold text-core-blue">
                  ${product.price}
                </span>
                <span className="bg-green-100 text-green-800 text-sm font-bold px-4 py-2 rounded-full">
                  Stock: {product.stock} disponibles
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-core-blue hover:bg-core-cyan text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-core-cyan/50 flex items-center justify-center cursor-pointer"
              >
                <ShoppingCart className="mr-3 h-6 w-6" />
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
