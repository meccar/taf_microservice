const mongoose = require("mongoose");
const { updateIfCurrentPlugin } = require("mongoose-update-if-current");
const { Order, OrderStatus } = require("./order");

/**
 * @typedef {Object} ProductAttrs
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {mongoose.Schema.Types.ObjectId} promotion
 * @property {mongoose.Schema.Types.ObjectId} category
 */

/**
 * @typedef {Object} ProductDoc
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {mongoose.Schema.Types.ObjectId} promotion
 * @property {mongoose.Schema.Types.ObjectId} category
 * @property {number} version
 * @property {function(): Promise<boolean>} isReserved
 */

/**
 * @typedef {Object} ProductModel
 * @property {function(ProductAttrs): ProductDoc} build
 * @property {function(Object): Promise<ProductDoc | null>} findByEvent
 */

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    promotion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Promotion",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ProductSchema.set("versionKey", "version");
ProductSchema.plugin(updateIfCurrentPlugin);

/**
 * Builds a ProductDoc
 * @param {ProductAttrs} attrs
 * @returns {ProductDoc}
 */

ProductSchema.statics.build = (attrs) => {
  return new Product({
    _id: attrs.id,
    title: attrs.title,
    description: attrs.description,
    price: attrs.price,
    promotion: attrs.promotion,
    category: attrs.category,
  });
};

/**
 * Finds a ProductDoc by event
 * @param {{ id: string, version: number }} event
 * @returns {Promise<ProductDoc | null>}
 */

ProductSchema.statics.findByEvent = (event) => {
  return Ticket.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

/**
 * Checks if the ticket is reserved
 * @returns {Promise<boolean>}
 */

ProductSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
};

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
