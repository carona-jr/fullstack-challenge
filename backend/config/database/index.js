import mongoose from 'mongoose'
import { MONGO_URI } from '../index'

export default () => mongoose.connect(MONGO_URI)