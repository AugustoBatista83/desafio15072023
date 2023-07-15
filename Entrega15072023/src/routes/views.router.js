import { Router } from "express";
import ProductManager from '../manager/product.manager.js';

const router = Router();
const productManager = new ProductManager();

// Ruta para mostrar todos los productos en una vista 'products'
router.get('/', async (req, res) => {
    const products = await productManager.list();
    res.render('products', { products });
});

// Ruta para mostrar todos los productos en tiempo real en una vista 'products_realtime'
router.get('/products-realtime', async (req, res) => {
    const products = await productManager.list();
    res.render('products_realtime', { products });
});

// Ruta para mostrar el formulario para agregar productos en una vista 'form'
router.get('/form-products', async (req, res) => {
    res.render('form', {});
});

// Ruta para procesar el formulario y agregar un nuevo producto
router.post('/form-products', async (req, res) => {
    const data = req.body;
    const result = await productManager.create(data);

    res.redirect('/');
});

export default router;
