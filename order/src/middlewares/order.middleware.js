const { catchAsync, AppError, OrderStatus } = require("@tafvn/common");
const Product = require("../models/product.model");

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

const checkOrder = catchAsync(async (req, res, next) => {
  const { productID } = req.body;
  const product = await Product.findById(productID);

  if (!product) {
    return next(new AppError("Product not founded", 404));
  }

  const isReserved = await product.isReserved();
  if (isReserved) {
    return next(new AppError("Bad request", 400));
  }

  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

  req.body = Order.build({
    userID: req.currentUser.id,
    status: OrderStatus.Created,
    expiresAt: expiration,
    product,
  });

  next();
});

module.exports = checkOrder;
