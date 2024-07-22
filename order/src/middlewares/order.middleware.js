const { catchAsync, AppError, OrderStatus } = require("@tafvn/common");

const checkOrder = catchAsync(async (req, res, next) => {
  const { productID } = req.body;
  const product = await Product.findById(productID);

  if (!product) {
    return next(new AppError("Product not founded", 404));
  }

  if (existingOrder) {
    return next(new AppError("Bad request", 400));
  }
});
