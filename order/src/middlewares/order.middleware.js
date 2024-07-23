const { catchAsync, AppError, OrderStatus } = require("@tafvn/common");
const Product = require("../models/product.model");

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
});

module.exports = checkOrder;
