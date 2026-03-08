import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/Nabvar";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { Checkout } from "./pages/Checkout";
import { Favorites } from "./pages/Favorites";

function App() {
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
}

export default App;
