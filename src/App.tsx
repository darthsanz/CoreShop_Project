import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/Nabvar";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { Checkout } from "./pages/Checkout";
import { Favorites } from "./pages/Favorites";
import { Login } from "./pages/Login";
import { useEffect } from "react";
import { auth } from "./lib/firebase";
import { useAuthStore } from "./store/authStore";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const { setUser, setLoading } = useAuthStore();

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
      <div className="min-h-screen bg-core-bg">
        {/* Estos 3 "muebles" siempre están en la pantalla, pase lo que pase */}
        <Navbar />
        <CartDrawer />
        <Toaster position="bottom-right" />

        {/*## Aquí ponemos las "Puertas" a las diferentes habitaciones ##*/}
        <Routes>
          {/* Habitacion del login */}
          <Route path="/login" element={<Login />} />
          {/* Direccion de la habitacion para el catalogo*/}
          <Route path="/" element={<Home />} />

          {/* Direccion de la habitacion de detalles de producto*/}
          <Route path="/producto/:id" element={<ProductDetail />} />

          {/* Direccion de la habitacion de Favoritos */}
          <Route path="/favoritos" element={<Favorites />}></Route>

          {/* Direccion de la habitacion del proceso de pago */}
          <Route path="/checkout" element={<Checkout />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
