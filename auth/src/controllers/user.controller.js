const { catchAsync, CreateToken } = require("@tafvn/common");

const User = catchAsync(async (req, res) => {
  CreateToken(req.user, 200, req, res);
});

module.exports = User;
