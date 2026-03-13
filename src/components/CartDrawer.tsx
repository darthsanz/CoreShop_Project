import { X, Trash2 } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";

export const CartDrawer = () => {
  //Traemos toda la oficina del gerente que necesitamospara el carrito
  const { cart, isCartOpen, closeCart, removeFromCart, clearCart } =
    useCartStore();
  //Conductor
  const navigate = useNavigate();
  const handleCheckoutClick = () => {
    closeCart(); //cerramos el panel lateral
    navigate("/checkout"); //Y redireccionamos al checkout
  };
  //Calculamos el total a pagar
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  //Si el panel esta cerrado, devolvemos 'null', no dibujamos nada en pantalla
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* fondo oscuro transparence, al hacer clic se cierra el panel */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity cursor-pointer"
        onClick={closeCart}
      />
      {/* El panel blanco deslizable, alineado a la derecha */}
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full h-full bg-white dark:bg-gray-900 shadow-2xl flex flex-col animate-slide-in-right">
          {/* Cabecera del panel */}
          <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-600">
            <h2 className="text-2xl font-bold text-core-blue dark:text-gray-100">
              Tu Carrito
            </h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors cursor-pointer"
            >
              <X className="h-6 w-6 text-gray-500 dark:text-gray-50" />
            </button>
          </div>
          {/* Cuerpo: lista de productos */}
          <div className="flex-1 overflow-y-auto p-5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-100 space-y-4">
                <p className="text-lg font-medium">Tu Carrito está vacío</p>
              </div>
            ) : (
              <ul className="space-y-6">
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-20 w-20 object-contain bg-gray-50 rounded-lg p-2"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-core-text dark:text-gray-200 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Cant: {item.quantity} x ${item.price}
                      </p>
                    </div>
                    <p className="font-extrabold text-core-blue dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Pie:Resumen y boton de pago */}
          {cart.length > 0 && (
            <div className="border-t border-gray-100 dark:border-gray-600 p-6 bg-gray-50 dark:bg-gray-900">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-600 dark:text-gray-300">
                  Total a pagar:
                </span>
                <span className="text-3xl font-extrabold text-core-blue dark:text-cyan-300">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-core-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-core-cyan transition-color shadow-lg shadow-core-blue/30 cursor-pointer"
              >
                Proceder al pago
              </button>
              <button
                onClick={clearCart}
                className="w-full mt-4 text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
              >
                Vaciar carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
