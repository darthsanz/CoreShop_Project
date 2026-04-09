import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "./cartStore";

describe("Caja Fuerte del Carrito (useCartStore)", () => {
  beforeEach(() => {
    useCartStore.setState({ cart: [] });
  });

  //Prueba 1: Estado inicial
  it("deberia empezar con un carrito completamente vacio", () => {
    //1.Leemos la caja fuerte
    const estadoActual = useCartStore.getState();

    //2.Afirmamos lo que esperamos (Expectativa)
    expect(estadoActual.cart.length).toBe(0);
  });

  it("deberia agregar un producto al carrito e incrementar la cantidad si este ya existe", () => {
    const mockProduct = {
      id:123,
      title: "Core Case Pro",
      price: 25,
      image: "test.jpg",
    }as any;

    //Obtenemoslas funciones de la caja fuerte (zustand)
    const { addToCart } = useCartStore.getState();

    //ACT (Actuar):el robot agrega el producto dos veces
    addToCart(mockProduct);
    addToCart(mockProduct);

    //ASSERT (Afirmar): El juez verifica los resultados
    const { cart } = useCartStore.getState();

    //Esperamos que solo haya un elemento en el array (no dos filas iguales)
    expect(cart.length).toBe(1);

    //Esperamos que la cantidad de ese unico elemento sea 2
    expect(cart[0].quantity).toBe(2);

    //Verificamos que el precio se mantenga correcto
    expect(cart[0].price).toBe(25);
  });


  it("deberia eliminar un producto del carrito", () => {
    const mockProduct2 = {
      id:555,
      title: "Jaifon 12",
      price: 50,
      image: "jaifon.jpg",
    } as any;
    const { addToCart } = useCartStore.getState();
    addToCart(mockProduct2);

    const { removeFromCart } = useCartStore.getState();
    removeFromCart(mockProduct2.id);

    const CartActual = useCartStore.getState();
    expect(CartActual.cart.length).toBe(0);
  });


  it("deberia agregar dos productos en filas separadas", () => {
    const mockProduct3 = {
      id: 666,
      title: "jaifon 13",
      price: 60,
      image: "jaifon13.jpg",
    } as any;
    const mockProduct4 = {
      id: 777,
      title: "jaifon 14",
      price: 70,
      image: "jaifon14.jpg",
    } as any;

    const { addToCart } = useCartStore.getState();
    addToCart(mockProduct3);
    addToCart(mockProduct4);

    const estadoCartActual = useCartStore.getState();
    expect(estadoCartActual.cart.length).toBe(2);
  });


  it("deberia eliminar todos los productos del carrito (vaciar carrito)", () => {
    const mockProduct5 = {
      id: 888,
      title: "jaifon 15",
      price: 60,
      image: "jaifon15.jpg",
    }as any;
    const mockProduct6 = {
      id: 999,
      title: "jaifon 16",
      price: 70,
      image: "jaifon16.jpg",
    }as any;
    const mockProduct7 = {
      id: 1000,
      title: "jaifon 17",
      price: 70,
      image: "jaifon17.jpg",
    }as any;

    const { addToCart } = useCartStore.getState();
    addToCart(mockProduct5);
    addToCart(mockProduct6);
    addToCart(mockProduct7);

    const { clearCart } = useCartStore.getState();
    clearCart();

    const carritoActual = useCartStore.getState();
    expect(carritoActual.cart.length).toBe(0);
  });
});
