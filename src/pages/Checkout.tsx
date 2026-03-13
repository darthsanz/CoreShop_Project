import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  CheckCircle,
  Loader2,
  ShoppingCart,
} from "lucide-react";
import { useCartStore } from "../store/cartStore";
import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useOrderStore } from "../store/orderStore";
// import toast from "react-hot-toast";
// import { resolve } from "path";

export const Checkout = () => {
  const { cart, clearCart } = useCartStore();

  //traemos al usuario actual y la funcion para guardar ordenes
  const { user } = useAuthStore();
  const addOrder = useOrderStore((state) => state.addOrder);

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  //Estados para simular el proceso de pagos
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  //La funcion que se dispara al dar click en pagar
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newOrder = {
      id: crypto.randomUUID(), //Genera un ID unico para este ticket
      userId: user ? user.uid : "invitado", //Si no hay un usuario es un invitado
      date: new Date().toISOString(), //guardamos la fecha y la hora exacta
      items: cart,
      total: totalAmount,
    };

    addOrder(newOrder); //lo guardamos en el archivero

    setIsProcessing(false);
    setIsSuccess(true);
    clearCart();
  };

  //LA PANTALLA DE EXITO (SI YA PAGO)
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-core-bg dark:bg-gray-950 flex flex-col items-center justify-center px-4 animate-fade-in">
        <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl max-w-lg w-full text-center">
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6 animate-bounce" />
          <h1 className="text-4xl font-extrabold text-core-text dark:text-gray-100 mb-4">
            ¡Pago Exitoso!
          </h1>
          <p className="text-gray-500 dark:text-gray-200 mb-8 text-lg">
            Tu pedido ha sido confirmado. Te enviaremos los detalles a tu correo
            electrónico.
          </p>
          <Link
            to="/"
            className="inline-block w-full bg-core-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-core-cyan transition-colors shadow-lg"
          >
            Seguir Comprando
          </Link>
        </div>
      </div>
    );
  }

  //LA PANTALLA SI EL USUARIO ENTRA SIN NADA EN EL CARRITO
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-core-bg dark:bg-gray-950 px-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-full shadow-sm mb-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <ShoppingCart className="h-24 w-24 text-gray-300 dark:text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Tu carrito está vacio
        </h2>
        <p className="text-gray-500 dark:text-white mb-8 text-center">
          Agrega algunos productos antes de proceder al pago
        </p>
        <Link
          to="/"
          className="bg-core-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-core-cyan shadow-lg hover:shadow-core-cyan/50 transition-colors"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }
  // LA PANTALLA DE FORMULARIO DE PAGO
  return (
    <div className="min-h-screen bg-core-bg dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-gray-500 dark:text-gray-100 hover:text-core-blue dark:hover:text-core-cyan transition-colors mb-8 font-semibold"
        >
          <ArrowLeft className="h-5 w-5 mr-2"></ArrowLeft>
          Volver a la tienda
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden p-8">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 dark:border-gray-600 p-6">
            <CreditCard className="h-8 w-8 text-core-blue dark:text-core-cyan" />
            <h1 className="text-3xl font-extrabold text-core-text dark:text-gray-100">
              Finalizar compra
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Lado izquierdo:Formulario, en construccion */}
            <div>
              <h2 className="text-xl font-bold text-gray-500 dark:text-gray-100 mb-4">
                Datos de Envío y Pago
              </h2>
              {/* Al enviar el formulario se ejecuta handlePayment */}
              <form
                id="checkout-form"
                onSubmit={handlePayment}
                className="space-y-5"
              >
                {/* Campos requeridos simples */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-50 mb-1">
                    Nombre Completo
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-50 mb-1">
                    Dirección de Envio
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Calle, Número, Ciudad"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 outline-none transition-all "
                  />
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-600">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-100 mb-1">
                    Número de Tarjeta (Ficticio)
                  </label>
                  <input
                    required
                    type="text"
                    maxLength={16}
                    placeholder="0000 0000 0000 0000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 outline-none transition-all font-mono"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-50 mb-1">
                      Fecha (MM/AA)
                    </label>
                    <input
                      required
                      type="text"
                      maxLength={5}
                      placeholder="12/25"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 outline-none transition-all font-mono"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-50 mb-1">
                      CVC
                    </label>
                    <input
                      required
                      type="password"
                      maxLength={3}
                      placeholder="***"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 outline-none transition-all font-mono"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Lado derecho resumen de la orden             */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl flex flex-col h-full">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Resumen de tu orden
              </h2>
              <ul className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 hide-scrollbar">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-12 h-12 object-contain bg-white rounded-md p-1 border border-gray-100"
                      />
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-gray-500 dark:text-gray-100">
                          Cant: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-core-blue dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-500 dark:text-gray-200">
                    Subtotal
                  </span>
                  <span className="font-extrabold text-gray-500 dark:text-white">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 dark:text-gray-200 font-semibold">
                    Envío
                  </span>
                  <span className="font-bold text-gray-500 dark:text-white">
                    ¡Gratis!
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-600 dark:text-gray-200">
                    Total a pagar:
                  </span>
                  <span className="text-2xl font-extrabold text-core-blue dark:text-white">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
                {/* El boton cambia de estado si esta procesando */}
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isProcessing}
                  className={`w-full mt-6 py-4 rounded-xl font-bold text-lg text-white transition-all flex items-center justify-center shadow-lg ${isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-core-blue hover:bg-core-cyan hover:drop-shadow-core-cyan/50 cursor-pointer"}`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="animate-spin h-6 w-6 mr-3" />
                      Procesando pago...
                    </>
                  ) : (
                    `Pagar $${totalAmount.toFixed(2)}`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
