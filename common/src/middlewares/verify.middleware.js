const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const Verify = (Model) =>
  catchAsync(async (req, res, next) => {
    const user = await Model.findOne(req.body.email).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    req.user = user;

    next();
  });

module.exports = { Verify };
