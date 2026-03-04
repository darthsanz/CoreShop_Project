import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/Nabvar";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";

function App() {
  return (
    // BrowserRouter es el "vigilante" que observa la URL del navegador
    <BrowserRouter>
      <div className="min-h-screen bg-core-bg">
        {/* Estos 3 "muebles" siempre están en la pantalla, pase lo que pase */}
        <Navbar />
        <CartDrawer />
        <Toaster position="bottom-right" />

        {/* Aquí ponemos las "Puertas" a las diferentes habitaciones */}
        <Routes>
          {/* Si la URL es "/", abre la puerta del Catálogo (Home) */}
          <Route path="/" element={<Home />} />

          {/* Si la URL es "/producto/123", abre la puerta de los Detalles */}
          <Route path="/producto/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
