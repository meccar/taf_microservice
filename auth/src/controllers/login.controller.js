const catchAsync = require("../utils/catchAsync");

exports.LoginController = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
  });
});
