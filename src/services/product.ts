import type { DummyJsonResponse } from "../types"; //importamos la interfaz nuestro cadenero

//Creamos la funcion para ir a buscar los productos
//Promete que lo que devolceras tiene cumple con la forma exacta de DummyJsonResponse
export const getProducts = async (): Promise<DummyJsonResponse> => {
  try {
    //Hacemos la peticion a la API. pedimos 100 para asegurarnos que vengan electronicos
    const response = await fetch("https://dummyjson.com/products?limit=200");

    if (!response.ok) {
      throw new Error("Error al obtener los productos de la bodega");
    }
    //Convertimos la respuesta a formato JSON
    const data: DummyJsonResponse = await response.json();
    //Definimos que categorias si aceptamos en coreshop
    const validTechCategories = [
      "smartphones",
      "laptops",
      "tablets",
      "mobile-accessories",
      "audio-accessories",
    ];
    //Filtramos: solo dejamos pasar a los que su categoria esten en nuestra lista
    const filteredProducts = data.products.filter((product) =>
      validTechCategories.includes(product.category),
    );
    //Devolvemos la caja con la lista de productos purificada
    return {
      ...data,
      products: filteredProducts,
    };
  } catch (error) {
    console.error("Hubo un pronlema en el servicio de productos:", error);
    throw error;
  }
};
