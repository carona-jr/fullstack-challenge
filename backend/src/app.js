import express from 'express'
import cors from 'cors'
import routes from './controllers'
import db from '../config/database'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'
// import { scheduleJob } from 'node-schedule'
// import { scrapProducts } from './jobs'
// import { JOB_TIME } from '../config'

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// scheduleJob(JOB_TIME, () => scrapProducts())

try {
    db()
} catch (e) {
    console.log(e)
}

export default app