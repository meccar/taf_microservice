const { catchAsync } = require("@tafvn/common");
const CreateToken = require("./auth.controller");

const User = catchAsync(async (req, res) => {
  CreateToken(req.user, 200, req, res);
});

module.exports = User;
