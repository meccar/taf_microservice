const { catchAsync } = require("@tafvn/common");
const CreateToken = require("./auth.controller");

const LoginController = catchAsync(async (req, res) => {
  CreateToken(req.user, 200, req, res);
});

module.exports = LoginController;
