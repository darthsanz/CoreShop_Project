import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/Nabvar";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { Checkout } from "./pages/Checkout";
import { Favorites } from "./pages/Favorites";
import { Login } from "./pages/Login";
import { Orders } from "./pages/Orders";
import { useEffect } from "react";
import { auth } from "./lib/firebase";
import { useAuthStore } from "./store/authStore";
import { onAuthStateChanged } from "firebase/auth";
import { useThemeStore } from "./store/themeStore";

const App = () => {
  const { setUser, setLoading } = useAuthStore();

  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  // 1. EFECTO DEL TEMA Y SAFARI (Solo reacciona a isDarkMode)
  useEffect(() => {
    // A. Cambiamos la clase HTML general
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // B. Cambiamos el meta-tag para Safari
    const currentColor = isDarkMode ? "#030712" : "#f8fafc"; 
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", currentColor);
    }

    // C.PARA IOS: Forzamos al body a cambiar de color por código
    // Esto obliga a Safari a repintar la pantalla al instante sin esperar al carrito
    document.body.style.backgroundColor = currentColor;
    
  }, [isDarkMode]);


  // 2. EFECTO DE FIREBASE (Solo corre al cargar la app por primera vez)      
  useEffect(() => {
    //onAuthStateChanged es un espia de firebase que avisa cuando alguien se loguea o desloguea
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); //termino busqueda
    });
    //Limpiamos el espia si el componente se destruye
    return () => unsubscribe();
  }, [setUser, setLoading]);

  return (
    // BrowserRouter es el "vigilante" que observa la URL del navegador
    <BrowserRouter>
      <div className="min-h-screen bg-core-bg dark:bg-gray-950 transition-colors duration-300">
        {/* Estos 3 "muebles" siempre están en la pantalla, pase lo que pase */}
        <Navbar />
        <CartDrawer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              //Para modo oscuro gray-800
              background: isDarkMode ? "#1f2937" : "#ffffff",
              //Colores del texto
              color: isDarkMode ? "#f9fafb" : "#111827",
              //borde para darle mas sabor
              border: isDarkMode ? "1px solid #374151" : "1px solid #f3f4f6",
            },
          }}
        />

        {/*-- Aquí ponemos las "Puertas" a las diferentes habitaciones --*/}
        <Routes>
          {/* Habitacion del login */}
          <Route path="/login" element={<Login />} />

          {/* Direccion de la habitacion para el catalogo(Incio)*/}
          <Route path="/" element={<Home />} />

          {/* Direccion de la habitacion de detalles de producto*/}
          <Route path="/producto/:id" element={<ProductDetail />} />

          {/* Direccion de la habitacion de Favoritos */}
          <Route path="/favoritos" element={<Favorites />}></Route>

          {/* Direccion de la habitacion del proceso de pago */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Direccion de la habitacion de historial de compras(Orders) */}
          <Route path="/mis-compras" element={<Orders />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
