import request from 'supertest'
import app from '../src/app'

test('Should return a product list', async () => {
    const response = await request(app).get('/products').expect(200)
})

test('Should return a product detail', async () => {
    const response = await request(app).get('/products/617493feffcc7ec793c0fd77').expect(200)
})

test('Should return a product not found', async () => {
    const response = await request(app).get('/products/1').expect(404)
})