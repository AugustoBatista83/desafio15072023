import { Router } from 'express';
import ProductManager from '../manager/product.manager.js';

const router = Router();
const productManager = new ProductManager();

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
  const result = await productManager.list();
  res.send(result);
});

// Ruta para crear un nuevo producto
router.post('/', async (req, res) => {
  const data = req.body;
  const result = await productManager.create(data);
  res.send(result);
});

export default router;
