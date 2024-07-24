const { AppError } = require("../utils/appError");

exports.GetMe = (req, res, next) => {
  if (req.user.id) {
    req.params.id = req.user.id;
    req.body.user = req.user.id;
  }
  next();
};

exports.Authorize = (Model) =>
  catchAsync(async (req, res, next) => {
    let user = await Model.findById(req.params.id);

    if (user.userID !== req.currentUser.id) {
      return next(new AppError("The account is not authorized", 401));
    }

    next();
  });
