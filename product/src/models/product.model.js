const mongoose = require("mongoose");

const ProductCreatedPublisher = require("../events/publishers/product-created-publisher");
const ProductUpdatedPublisher = require("../events/publishers/product.updated.publisher");
const natsWrapper = require("../nats-wrapper");

const {
  Types: { ObjectId },
} = mongoose;

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  promotion: {
    type: ObjectId,
    ref: "promotion",
  },
  category: {
    type: ObjectId,
    ref: "category",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// ProductSchema.pre(/^find/, function (next) {
//   this.populate("user").populate({
//     path: "product",
//     select: "name",
//   });
//   next();
// });

ProductSchema.post("save", function (doc) {
  if (doc) {
    new ProductCreatedPublisher(natsWrapper.client).publish({
      id: this.id,
      title: this.title,
      price: this.price,
    });
  }
});

ProductSchema.post("findByIdAndUpdate", function (doc) {
  if (doc) {
    new ProductUpdatedPublisher(natsWrapper.client).publish({
      id: doc._id,
      title: doc.title,
      price: doc.price,
    });
  }
});

const Product = mongoose.model("products", ProductSchema);
module.exports = Product;
