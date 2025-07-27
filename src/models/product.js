import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    company: String,
    color: String,
    category: String
})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;