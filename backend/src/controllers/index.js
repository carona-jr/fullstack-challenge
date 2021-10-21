import express from 'express'
import productController from './productController'
const routes = express.Router()

routes.get('/', async (req, res) => {
    try {
        res.status(200).send('Fullstack Challenge 2021')
    } catch (e) {
        res.status(400).send({ error: e })
    }
})

routes.use('/products', productController)

export default routes