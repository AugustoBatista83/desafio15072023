import FileManager from "./file.manager.js";

export default class CartManager extends FileManager {
  constructor() {
    super('./carts.json');
    // Llama al constructor de FileManager y pasa './carts.json' como argumento.
  }

  async create() {
    const data = { products: [] };
    // Crea un objeto 'data' con una propiedad 'products' que es un arreglo vacío.

    await this.set(data);
    // Llama al método 'set' heredado de FileManager para establecer los datos en el archivo JSON.

    return data;
    // Devuelve el objeto 'data'.
  }

  async addProduct(cartId, productId) {
    const cart = await this.getById(cartId);
    // Llama al método 'getById' heredado de FileManager para obtener un objeto 'cart' según el 'cartId' proporcionado.

    cart.products.push(productId);
    // Agrega 'productId' al arreglo 'cart.products'.

    await this.update(cart);
    // Llama al método 'update' heredado de FileManager para actualizar el objeto 'cart' en el archivo JSON.

    return cart;
    // Devuelve el objeto 'cart'.
  }

  async list() {
    return await this.get();
    // Llama al método 'get' heredado de FileManager y devuelve la promesa resultante.
  }
}
