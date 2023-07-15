import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import productRouter from './routes/product.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import ProductManager from './manager/product.manager.js'
import __dirname from './utils.js'

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Configuración de Handlebars como motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Middleware para el manejo de datos en formato JSON y URL-encoded
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Rutas
app.use('/', viewsRouter) // Ruta para las vistas
app.use('/api/products', productRouter) // Ruta para los productos (API)
app.use('/api/carts', cartRouter) // Ruta para los carritos (API)

// Creación del servidor HTTP y Socket.IO
const httpServer = app.listen(8080, () => {
    console.log('Server is running on port 8080')
})

const io = new Server(httpServer)

// Manejo del evento de conexión de Socket.IO
io.on('connection', socket => {
    // Manejo del evento 'new-product' enviado desde el cliente
    socket.on('new-product', async data => {
        const productManager = new ProductManager()
        await productManager.create(data)

        const products = await productManager.list()
        io.emit('reload-table', products)
    })
})
