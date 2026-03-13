import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react"; //LogIn
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";

export const Login = () => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, user } =
    useAuthStore();
  const navigate = useNavigate();

  //Estados para el formulario de correo
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //Si el usuario ya esta logueado, lo mandamos al catalogo automaticamente
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (isRegistering) {
      await registerWithEmail(email, password);
    } else {
      await loginWithEmail(email, password);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-core-bg dark:bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-50">
          Inicia sesión en tu cuenta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-900 py-8 px-4 shadow-xl sm:rounded-3xl sm:px-10 border border-gray-100 dark:border-gray-600">
          {/* Boton de google */}
          <div className="mt-2">
            <button
              onClick={loginWithGoogle}
              className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-950 text-sm font-bold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-core-blue cursor-pointer"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continuar con Google
            </button>
          </div>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                  O usa tu correo electrónico
                </span>
              </div>
            </div>
          </div>
          {/* Formulario del correo proximo */}
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-100 mb-1">
                Correo Electrónico
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-100 mb-1">
                Contraseña
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-bold text-white bg-core-blue hover:bg-core-cyan transition-colors flex justify-center items-center shadow-md disabled:bg-gray-400"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : isRegistering ? (
                "Registrarse"
              ) : (
                "Entrar"
              )}
            </button>
          </form>
          {/* Boton para cambiar entre login y registro */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-sm font-semibold text-core-blue dark:text-gray-100 hover:text-core-cyan transition-colors"
            >
              {isRegistering
                ? "¿Ya tienes cuenta? Inicia sesión"
                : "¿No tienes cuenta? Registrate"}
            </button>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-semibold text-core-blue dark:text-gray-100 hover:text-core-cyan transition-all"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
