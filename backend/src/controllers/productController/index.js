import { Router } from 'express'
import Product from '../../models/product'
const productController = Router()

productController.get('/', async (req, res) => {
    try {
        const matchs = [
            'name'
        ]
        let match = {}
        let sort = {}

        if (req.query.sortBy) {
            const prop = req.query.sortBy.split(':')
            sort[prop[0]] = prop[1] == 'desc' ? -1 : 1
        }

        const queries = Object.keys(req.query)
        queries.map(query => {
            if (matchs.includes(query)) {
                match[query] = { $regex: req.query[query], $options: 'i' }
            }
        })

        const $match = { ...match }
        const $sort = { ...sort }
        const $limit = req.query.limit ? parseInt(req.query.limit) : 999999999999999
        const documents = await Product.find($match).sort($sort).limit($limit)


        const count = await Product.countDocuments($match)
        res.status(200).send({
            documents: documents.slice(req.query.skip, req.query.limit),
            count
        })
    } catch (e) {
        res.status(400).send({ code: 400, message: e })
    }
})

productController.get('/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const product = await Product.findOne({ _id, active: true })
        res.status(200).send({ ...product._doc })
    } catch (e) {
        res.status(404).send({ code: 404, message: 'produto não encontrado' })
    }
})

export default productController