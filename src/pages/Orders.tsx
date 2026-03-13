import { Link } from "react-router-dom";
import { Package, ArrowLeft, Calendar, ShoppingBag } from "lucide-react";
import { useOrderStore } from "../store/orderStore";
import { useAuthStore } from "../store/authStore";

export const Orders = () => {
  const { orders } = useOrderStore();
  const { user } = useAuthStore();

  //Filtramos para que el usuario solo vea sus compras(o las de invitado si no tiene cuenta)
  const currentUserId = user ? user.uid : "invitado";
  const myOrders = orders.filter((order) => order.userId === currentUserId);

  //pantalla vacia si no ha comprado nada
  if (myOrders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-core-bg dark:bg-gray-950 px-4 animate-fade-in">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-full shadow-sm mb-6">
          <Package className="h-20 w-20 text-gray-300 dark:text-gray-50" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Aún no tienes compras
        </h2>
        <p className="text-gray-500 dark:text-gray-100 mb-8 text-center max-w-md">
          Tu historial está vacio. ¡Descubre nuestro catálogo y haz tu primer
          pedido!
        </p>
        <Link
          to="/"
          className="bg-core-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-core-cyan transition-colors shadow-lg"
        >
          Ir a la tienda
        </Link>
      </div>
    );
  }

  //PANTALLA CON HISTORIAL
  return (
    <div className="min-h-screen bg-core-bg dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-gray-500 dark:text-gray-100 hover:text-core-blue transition-colors mb-8 font-semibold"
        >
          <ArrowLeft className="h-5 w-5" />
          Volver a la tienda
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="h-8 w-8 text-core-blue" />
          <h1 className="text-3xl font-extrabold text-core-text dark:text-gray-100">
            Mis compras
          </h1>
        </div>

        <div className="space-y-6">
          {myOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Encabezado del ticket */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-betweensss gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-200 mb-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(order.date).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-xs text-gray-400 font-mono">
                    ID:{order.id}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-200">
                    Total pagado
                  </p>
                  <p className="text-2xl font-extrabold text-core-blue dark:text-core-cyan">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Lista de productos de ese ticket */}
              <div className="p-6">
                <ul className="space-y-4">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-xl p-2 shrink-0 border border-amber-100">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="grow">
                        <Link
                          to={`/producto/${item.id}`}
                          className="font-bold text-gray-800 dark:text-gray-100 hover:text-core-blue transition-colors line-clamp-1"
                        >
                          {item.title}
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-200">
                          Cantidad:{item.quantity}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-gray-700 dark:text-gray-50">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
