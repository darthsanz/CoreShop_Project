import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";


//Definimos nuestro diccionario

const resources = {
  es: {
    translation: {
      //Traducciones (español)
      //Global
      common: {
        add: "Agregar",
        add_cart: "Agregar al carrito",
        back: "Volver",
        stock: "Stock",
        available: "Disponibles",
        added_to_cart: "Agregado al carrito",
        back_to_store: "Volver a la Tienda",
        subtotal: "Subtotal",
        shipping: "Envío",
        free: "Gratis",
        total_to_pay: "Total a pagar",
        pay: "Pagar",
        processing_payment: "Procesando pago",
        go_to_store: "Ir a la tienda",
      },

      auth_login: {
        title: "Inicia sesión en tu cuenta",
        continue_with_google: "Continuar con Google",
        or_email: "O usa tu correo electrónico",
        login: "Login",
        sign_up: "¿No tienes cuenta? Regístrate",
        button_login: "Iniciar Sesión",
        button_create_account: "Crear Cuenta",
        create_account: "¿No estás registrado? Crea una cuenta",
        already_have_account: "¿Ya tienes cuenta? Inicia sesión",

        login_With_Google: {
          login: "¡Bienvenido!",
          login_error: "Hubo un error al iniciar sesión",
        },

        login_With_Email: {
          login: "¡Bienvenido de vuelta!",
          login_error: "Correo o contraseña incorrecta",
        },

        register_With_Email: {
          success_message: "Cuenta creada con éxito",
          password_error: "La contraseña debe tener al menos 6 caracteres",
          email_in_use: "Este correo ya está registrado",
          sign_up_error: "Hubo un error al registrarse",
        },

        logout: {
          logout: "Sesión cerrada",
          logout_error: "Error al cerrar sesión",
        },

        placeholder: {
          example_email: "tu@correo.com",
        },

        form: {
          email: "Correo Electrónico",
          password: "Contraseña",
        },
      },

      favorites: {
        no_favorites: {
          title: "Tu lista de deseos está vacía 💔",
          desc: "¡Explora nuestro catálogo y enamórate de nuestros increíbles productos!",
        },
        discover_products: "Descubrir productos",
        title: "Tus Favoritos",
      },

      order_history: {
        title: "Tus Compras",
        total_paid: "Total Pagado",
        quantity: "Cantidad",
        no_orders: {
          title: "Aún no tienes compras",
          desc: "Tu historial está vacio. ¡Descubre nuestro catálogo y haz tu primer pedido!",
        },
      },
      //Navbar
      nav: {
        search_placeholder: "Buscar productos...",
        login: "Ingresar",
        logout: "Salir",
        my_orders: "Mis Compras",
        greeting: "Hola",
        added_to_favorites: "Agregado a favoritos",
        removed_from_favorites: "Eliminado de favoritos",
      },
      //Home
      home: {
        explore_catalog: "Explora nuestro catálogo",
        all_categories: "Todas",
        loading: "Cargando productos...",
        no_results: "Sin resultados",
        no_results_desc:
          "No encontramos ningún producto que coincida con tu búsqueda",
        clear_filters: "Mostrar todos los productos",
        loading_details: "Cargando detalles del producto...",
        product_not_found: "Producto no encontrado",
        back_to_shop: "Volver al catálogo",
      },
      //Categorias productos
      categories: {
        all: "Todas",
        beauty: "Belleza",
        fragrances: "Perfumes",
        furniture: "Muebles",
        groceries: "Despensa",
        "home-decoration": "Decoración",
        "kitchen-accessories": "Cocina",
        laptops: "Laptops",
        "mens-shirts": "Ropa de Hombre",
        "mens-shoes": "Zapatos de Hombre",
        "mens-watches": "Relojes de Hombre",
        "mobile-accessories": "Accesorios Celular",
        motorcycle: "Motocicletas",
        "skin-care": "Cuidado de la piel",
        smartphones: "Celulares",
        "sports-accessories": "Deportes",
        sunglasses: "Lentes de sol",
        tablets: "Tablets",
        tops: "Ropa de Mujer",
        vehicle: "Vehículos",
        "womens-bags": "Bolsos de Mujer",
        "womens-dresses": "Vestidos",
        "womens-jewellery": "Joyería",
        "womens-shoes": "Zapatos de Mujer",
        "womens-watches": "Relojes de Mujer",
      },
      //Carrito
      cart: {
        title: "Tu Carrito",
        empty: "Tu Carrito está vacío",
        empty_desc:
          "Parece que aún no has agregado nada. ¡Explora nuestros productos!",
        total: "Total a pagar:",
        checkout: "Proceder al pago",
        continue_shopping: "Seguir comprando",
        clear_cart: "Vaciar carrito",
      },
      //Checkout
      checkout: {
        title: "Finalizar Compra",
        shipping_info: "Datos de Envío y Pago",
        processing_payment: "Procesando Pago",
        continue_shopping: "Seguir comprando",

        //Campos del formulario
        form: {
          full_name: "Nombre Completo",
          address: "Dirección de Envío",
          zip_code: "Código Postal",
          card_number: "Número de Tarjeta",
          card_date: "Fecha (MM/AA)",

          //Compos de ejemplo
          placeholders: {
            full_name: "Ej. Juan Pérez",
            address: "Calle, Número, Ciudad",
          },
        },

        order_summary: {
          title: "Resumen de tu orden",
          qty: "Cant:",
        },
        //Mensajes de exito
        success_title: "¡Pago Exitoso!",
        success_desc:
          "Tu pedido ha sido confirmado. Te enviaremos los detalles a tu correo electrónico.",
      },
      //Traducciones manuales
      products: {
        "78": {
          title: "Apple MacBook Pro 14 Pulgadas Gris Espacial",
          description:
            "El MacBook Pro de 14 pulgadas en color gris espacial es un portátil potente y elegante, equipado con el chip M1 Pro de Apple, que ofrece un rendimiento excepcional, y una impresionante pantalla Retina. ",
        },
        "79": {
          title: "Laptop Asus Zeenbook Pro Doble Pantalla",
          description:
            "El portátil Asus Zenbook Pro Dual Screen es un dispositivo de alto rendimiento con dos pantallas que ofrece productividad y versatilidad a los profesionales creativos.",
        },
      },
    },
  },
  en: {
    translation: {
      //Global
      common: {
        add: "Add",
        add_cart: "Add to cart",
        back: "Back",
        stock: "In stock",
        available: "Available",
        added_to_favorites: "Added to favorites",
        removed_from_favorites: "Removed from favorites",
        added_to_cart: "Added to cart",
        back_to_store: "Back to Store",
        subtotal: "Subtotal",
        shipping: "Shipping",
        free: "Free",
        total_to_pay: "Total to pay",
        pay: "Pay",
        processing_payment: "Processing payment",
        go_to_store: "Start Shopping",
        login: "¡Welcome!",
        logout: "Logged out",
      },

      auth_login: {
        title: "Log in to your account",
        continue_with_google: "Continue with Google",
        or_email: "Or use your email",
        login: "Login",
        sign_up: "Don't have an account? Sign up",
        button_login: "Log In",
        button_create_account: "Create Account",
        create_account: "Not registered? Create an account",
        already_have_account: "Already have an account? Log in",

        login_With_Google: {
          login: "Welcome!",
          login_error: "There was an error logging in",
        },

        login_With_Email: {
          login: "Welcome back!",
          login_error: "Invalid email or password",
        },

        register_With_Email: {
          success_message: "Account created successfully",
          password_error: "Password must be at least 6 characters",
          email_in_use: "This email is already registered",
          sign_up_error: "There was an error signing up",
        },

        logout: {
          logout: "Logged out",
          logout_error: "Error logging out",
        },

        placeholder: {
          example_email: "email@example.com",
        },

        form: {
          email: "Email Address",
          password: "Password",
        },
      },

      favorites: {
        no_favorites: {
          title: "Your wish list is empty 💔",
          desc: "Browse our catalog and fall in love with our amazing products!",
        },
        discover_products: "Discover products",
        title: "Your Favorites",
      },
      order_history: {
        title: "Order History",
        total_paid: "Total Paid",
        quantity: "Quantity",
        no_orders: {
          title: "You haven't made any purchases yet",
          desc: "Your history is empty. Explore our catalog and place your first order!",
        },
      },
      //Traducciones (Ingles)
      //Navbar
      nav: {
        search_placeholder: "Search products...",
        login: "Login",
        logout: "Logout",
        my_orders: "My Orders",
        greeting: "Hello",
      },
      //Home
      home: {
        explore_catalog: "Explore our catalog",
        all_categories: "All",
        loading: "Loading products...",
        no_results: "No results found",
        no_results_desc: "We couldn't find any products matching your search.",
        clear_filters: "Show all products",
        loading_details: "Loading product details...",
        product_not_found: "Product not found",
        back_to_shop: "Back to Shop",
      },
      //Categorias productos
      categories: {
        all: "All",
        // la API ya viene en inglés,
        // las ponemos de nuevo aquí por si queremos quitarles los guiones o poner mayúsculas
        beauty: "Beauty",
        fragrances: "Fragrances",
        furniture: "Furniture",
        groceries: "Groceries",
        "home-decoration": "Home Decoration",
        "kitchen-accessories": "Kitchen Accessories",
        laptops: "Laptops",
        "mens-shirts": "Men's Shirts",
        "mens-shoes": "Men's Shoes",
        "mens-watches": "Men's Watches",
        "mobile-accessories": "Mobile Accessories",
        motorcycle: "Motorcycles",
        "skin-care": "Skin Care",
        smartphones: "Smartphones",
        "sports-accessories": "Sports Accessories",
        sunglasses: "Sunglasses",
        tablets: "Tablets",
        tops: "Women's Tops",
        vehicle: "Vehicles",
        "womens-bags": "Women's Bags",
        "womens-dresses": "Women's Dresses",
        "womens-jewellery": "Women's Jewellery",
        "womens-shoes": "Women's Shoes",
        "womens-watches": "Women's Watches",
      },
      //Carrito
      cart: {
        title: "Your Cart",
        empty: "Your Cart is empty",
        empty_desc: "Add some items before proceeding to checkout.",
        total: "Estimated total:",
        checkout: "Proceed to checkout",
        continue_shopping: "Continue shopping",
        clear_cart: "Clear cart",
      },
      //Checkout
      checkout: {
        title: "Checkout",
        shipping_info: "Shipping and Payment Information",
        processing_payment: "Processing Payment",
        continue_shopping: "Continue shopping",

        //Campos del formulario
        form: {
          full_name: "Full name",
          address: "Shipping address",
          zip_code: "Zip code",
          card_number: "Card number",
          card_date: "Exp.Date (MM/YY)",

          //Compos de ejemplo
          placeholders: {
            full_name: "e.g., John Doe",
            address: "Street, House Number, City",
          },
        },
        order_summary: {
          title: "Order Summary",
          qty: "Qty:",
        },
        //Mensajes de exito
        success_title: "Payment Successful",
        success_desc:
          "Your order has been confirmed. We will send the details to your email address.",
      },
    },
  },
};

//Inicializamos la libreria
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "es", //Si el usuario es nuevo, usa español por defecto
    interpolation: {
      escapeValue: false, //React ya nos protege de los  hackeos (XSS)
    },
  });

export default i18n;
