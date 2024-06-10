const catchAsync = require("../utils/catchAsync");

exports.currentUserController = catchAsync(async (req, res) => {
  return res.send("Hi");
});
