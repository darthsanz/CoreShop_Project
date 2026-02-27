import { useEffect, useState } from "react";
import { Navbar } from "./components/Nabvar";
import { ProductCard } from "./components/ProductCard";
import { getProducts } from "./services/product";
import type { Product } from "./types";
import { CartDrawer } from "./components/CartDrawer";

function App() {
  //1.Estado local: aqui guardaremos las cajas que traiga el repartidor
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  //2. useEffect: esto se ejecuta una sola vez cuando la pagina carga
  // 2. useEffect: Esto se ejecuta UNA SOLA VEZ cuando la página carga
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        // Llamamos al repartidor
        const data = await getProducts();
        // Guardamos los productos en el estado de React
        setProducts(data.products);
      } catch (error) {
        console.error("No pudimos abrir la tienda:", error);
      } finally {
        // Ya terminamos de cargar (ya sea con éxito o error)
        setLoading(false);
      }
    };
    fetchStoreData();
  }, []); // El arreglo vacío [] significa "solo hazlo al abrir la página"

  return (
    <div className="min-h-screen bg-core-bg">
      {/* Nuestro Letrero y Carrito */}
      <Navbar />
      <CartDrawer />
      {/* Contenedor principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-extrabold text-core-text mb-8">
          Catálogo de Productos
        </h2>
        {/* Si esta cargando mostramos un mensaje, si no mostramos la cuadricula */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-core-blue font-semibold animate-pulse">
              Cargando productos...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Recorremos la lista de productos y dibujamos una tarjeta por cada uno */}
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
