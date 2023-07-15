import FileManager from "./file.manager.js";

export default class ProductManager extends FileManager {

    constructor() {
        super('./products.json');
        // Llama al constructor de FileManager y pasa './products.json' como argumento.
    }

    create = async(data) => {
        const result = await this.set(data);
        // Llama al método 'set' heredado de FileManager para guardar los datos del producto.
        return result;
        // Devuelve el resultado de la operación de guardado.
    }

    list = async () => {
        const result = await this.get();
        // Llama al método 'get' heredado de FileManager para obtener los datos de los productos.
        console.log('prueba ok', result);
        // Imprime el resultado en la consola (este console.log puede ser eliminado o modificado según las necesidades).
        return result;
        // Devuelve el resultado obtenido.
    }

}
