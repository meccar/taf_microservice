const jwt = require("jsonwebtoken");

const { catchAsync } = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const VerifyToken = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (req.session.jwt) {
    token = req.session.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401),
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.publicKey);
  const currentUser = await User.findById(decoded.sub);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists", 401),
    );
  }

  //   if (currentUser.changedPasswordAfter(decoded.iat)) {
  //     return next(
  //       new AppError(
  //         "Your password was recently changed. Please login again",
  //         401,
  //       ),
  //     );
  //   }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

module.exports = { VerifyToken };
