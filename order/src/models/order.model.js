const mongoose = require("mongoose");
const OrderStatus = require("@tafvn/common");
// const ProductCreatedPublisher = require("../events/publishers/product-created-publisher");
// const ProductUpdatedPublisher = require("../events/publishers/product.updated.publisher");
// const natsWrapper = require("../nats-wrapper");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Created,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  created_at: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },
  expiresAt: {
    type: mongoose.Schema.Types.Date,
  },
});

OrderSchema.methods.isReserved = catchAsync(async (req, res, next) => {
  const existingOrder = await Order.FindOne({
    product: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });
  next();
});

// ProductSchema.pre(/^find/, function (next) {
//   this.populate("user").populate({
//     path: "product",
//     select: "name",
//   });
//   next();
// });

// ProductSchema.post("save", function (doc) {
//   if (doc) {
//     new ProductCreatedPublisher(natsWrapper.client).publish({
//       id: this.id,
//       title: this.title,
//       price: this.price,
//     });
//   }
// });

// ProductSchema.post("findByIdAndUpdate", function (doc) {
//   if (doc) {
//     new ProductUpdatedPublisher(natsWrapper.client).publish({
//       id: doc._id,
//       title: doc.title,
//       price: doc.price,
//     });
//   }
// });

const Order = mongoose.model("orders", OrderSchema);
module.exports = Order;
