import request from 'supertest'
import app from '../src/app'

test('Should return a message from root', async () => {
    const response = await request(app).get('/').expect(200)
})