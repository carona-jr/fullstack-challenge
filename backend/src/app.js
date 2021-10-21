import express from 'express'
import cors from 'cors'
import routes from './controllers'
import db from '../config/database'

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

try {
    db()
} catch (e) {
    console.log(e)
}

export default app