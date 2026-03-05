import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../services/product";
import { useSearchStore } from "../store/searchStore";
import type { Product } from "../types";

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState('Todas');
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
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      {/* Título y Píldoras de Categorías (Ya no hay barra de búsqueda aquí) */}
      <div className="flex flex-col mb-8">
        <h2 className="text-3xl font-extrabold text-core-text mb-6">
          Explora nuestro catálogo
        </h2>

        <div className="flex overflow-x-auto pb-4 pt-1 pl-1 gap-3 hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 shadow-sm ${
                selectedCategory === category
                  ? "bg-core-blue text-white ring-2 ring-core-blue/30 ring-offset-2"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
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
          <p className="text-xl text-core-blue font-semibold animate-pulse">
            Cargando productos increíbles...
          </p>
        </div>
      ) : (
        <>
          {/* ¡AQUÍ ESTÁ LA MAGIA ARREGLADA! */}
          {/* Si el filtro no encontró nada, mostramos el botón de limpiar */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xl text-gray-500 font-medium">No coincide ningun producto con tu búsqueda.</p>
              <button
                onClick={() => {
                  setSearchTerm(''); // Aquí se usa setSearchTerm por fin
                  setSelectedCategory('Todas');
                }}
                className="mt-4 text-core-blue hover:text-core-cyan font-bold transition-colors"
              >
                Limpiar filtros
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

