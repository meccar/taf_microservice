const mongoose = require("mongoose");

const { Types: { ObjectId } } = mongoose;

const ProductSchema = new mongoose.Schema({
    title : {
        type: string
    },
    description: {
        type: string
    },
    price: {
        type: number
    },
    promotion: {
        type:ObjectId,
        ref: "promotion"
    },
    category: {
        type: ObjectId,
        ref: "category"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
})

const Product = mongoose.model("products", ProductSchema);
module.exports = Product;