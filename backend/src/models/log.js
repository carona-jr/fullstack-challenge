import mongoose from 'mongoose'

const logSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            Enum: ['LOG', 'ERROR'],
            required: true,
            default: 'LOG'
        },
        code: {
            type: String,
            trim: true
        },
        type: {
            type: String,
            Enum: ['SAVING', 'LOADING'],
            required: true,
            default: 'SAVING'
        },
        message: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        },
        collection: 'log'
    }
)

export default mongoose.model('Log', logSchema)