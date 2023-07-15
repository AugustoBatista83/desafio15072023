import fs from 'fs';

class FileManager {
  constructor(filename = './db.json') {
    this.filename = filename;
  }

  getNextId = (list) => {
    // Obtener el siguiente ID para un nuevo elemento en la lista.
    return list.length === 0 ? 1 : list[list.length - 1].id + 1;
  };

  get = async () => {
    // Obtener los datos del archivo JSON.
    try {
      const fileData = await fs.promises.readFile(this.filename, 'utf-8');
      return JSON.parse(fileData);
    } catch (error) {
      // En caso de error o si el archivo no existe, devolver una lista vacía.
      return [];
    }
  };

  getById = async (id) => {
    // Obtener un elemento por su ID.
    const data = await this.get();
    return data.find((d) => d.id == id);
  };

  set = async (data) => {
    // Agregar un nuevo elemento a la lista.
    const list = await this.get();
    data.id = this.getNextId(list);
    list.push(data);
    return fs.promises.writeFile(this.filename, JSON.stringify(list));
  };

  update = async (data) => {
    // Actualizar un elemento existente en la lista.
    const list = await this.get();
    const idx = list.findIndex((a) => a.id == data.id);
    list[idx] = data;

    return fs.promises.writeFile(this.filename, JSON.stringify(list));
  };
}

export default FileManager;
