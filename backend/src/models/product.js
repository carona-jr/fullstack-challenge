import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            index: true,
            unique: true,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        // eslint-disable-next-line camelcase
        imported_t: {
            type: Date,
            required: true,
            default: 0
        },
        status: {
            type: String,
            Enum: ['DRAFT', 'IMPORTED'],
            required: true,
            default: 'IMPORTED'
        },
        amount: {
            type: String
        },
        brands: [
            {
                name: {
                    type: String,
                    required: true
                },
                url: {
                    type: String
                }
            }
        ],
        packages: [
            {
                name: {
                    type: String,
                    required: true
                },
                url: {
                    type: String
                }
            }
        ],
        categories: [
            {
                name: {
                    type: String,
                    required: true
                },
                url: {
                    type: String
                }
            }
        ],
        stores: [
            {
                name: {
                    type: String,
                    required: true
                },
                url: {
                    type: String
                }
            }
        ],
        imageUrl: {
            type: String
        }
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        },
        collection: 'product'
    }
)

export default mongoose.model('Product', productSchema)