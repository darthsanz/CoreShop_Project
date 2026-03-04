import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../services/product";
import type { Product } from "../types";

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-extrabold text-core-text mb-8">
        Catálogo de Productos
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-core-blue font-semibold animate-pulse">
            Cargando productos increíbles...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};
