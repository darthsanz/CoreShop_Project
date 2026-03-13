import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../services/product";
import { useSearchStore } from "../store/searchStore";
import type { Product } from "../types";
import { SearchX } from "lucide-react";

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("Todas");
  //Aqui usamos los que el usuario escribio en la barra de busqueda
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreData();
  }, []);

  //Extraemos las cateogiras unicas de los productos que nos llega
  //Si llegan 10 laps y 10 celulares, esto solo guardara laptops y smartphones
  const categories = [
    "Todas",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  //El cerebro del filtro
  //Antes de dibujar revisamos quien pasa la prueba del texto y de la categoria
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todas" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      {/* Título y Píldoras de Categorías (Ya no hay barra de búsqueda aquí) */}
      <div className="flex flex-col mb-8">
        <h2 className="text-3xl font-extrabold text-core-text mb-6 dark:text-gray-100">
          Explora nuestro catálogo
        </h2>

        <div className="flex overflow-x-auto pb-4 pt-1 pl-1 gap-3 hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 shadow-sm cursor-pointer border ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ${
                selectedCategory === category
                  ? "bg-core-blue dark:bg-cyan-600 text-white border-transparent ring-2 ring-core-blue/30 dark:ring-core-cyan"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ring-0 ring-transparent"
              }`}
            >
              {category.charAt(0).toUpperCase() +
                category.slice(1).replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-core-blue dark:text-gray-100 font-semibold animate-pulse">
            Cargando productos increíbles...
          </p>
        </div>
      ) : (
        <>
          {/* Si el filtro no encontró nada, mostramos el botón de limpiar */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              {/* El ícono centrado con un fondo circular sutil */}
              <div className="flex justify-center mb-6">
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-full border border-gray-100 dark:border-gray-800">
                  <SearchX className="h-16 w-16 text-gray-400 dark:text-gray-400" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-core-text dark:text-white mb-2 transition-colors duration-300">
                Sin resultados
              </h3>

              <p className="text-lg text-gray-500 dark:text-gray-400 font-medium mb-8">
                No encontramos ningún producto que coincida con tu búsqueda.
              </p>

              <button
                onClick={() => {
                  setSearchTerm(""); // Aquí se usa setSearchTerm por fin
                  setSelectedCategory("Todas");
                }}
                className="px-6 py-3 bg-core-blue dark:bg-cyan-600 text-white rounded-xl font-bold hover:bg-core-cyan dark:hover:bg-cyan-500 transition-colors shadow-lg hover:shadow-core-cyan/50"
              >
                Limpiar búsqueda
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
};;

