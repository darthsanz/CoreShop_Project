export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string; //foto principal del producto
  images: string[]; //array de fotos extras
}

export interface DummyJsonResponse {
  products: Product[]; //Aqui viene nuestra lista de productos
  total: number;
  skip: number;
  limit: number;
}
