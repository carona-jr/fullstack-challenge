import dotenv from 'dotenv'
import path from 'path'

const ENV = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`)

dotenv.config({ path: ENV })

const {
    MONGO_PROTOCOL,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_DB_NAME,
    PORT
} = process.env

const MONGO_URI =
    `${MONGO_PROTOCOL}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}`
    || 'mongodb://localhost/myserver'

export {
    MONGO_URI,
    PORT
}