import { Router } from 'express'
const productController = Router()

productController.get('/', async (req, res) => {
    try {
        res.send({ teste: 'ok2' })
    } catch (e) {
        res.status(400).send({ error: e })
    }
})

productController.get('/:code', async (req, res) => {
    try {
        res.send({ teste: 'ok' })
    } catch (e) {
        res.status(404).send({ error: 'O produto não foi encontrado' })
    }
})

export default productController