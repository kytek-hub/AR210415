import mongoose, { Schema } from 'mongoose'

import ProductModel from './Product'

const Product = mongoose.model('Product', new Schema(ProductModel, { timestamps: true }))

export { Product }
