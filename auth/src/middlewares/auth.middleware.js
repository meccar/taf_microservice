const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");
const Config = require("../config/config");
const AppError = require("../utils/appError");

exports.GenerateToken = (id) => {
  const payload = {
    sub: id,
    iat: Date.now(),
  };

  return jwt.sign(payload, Config.privateKey, Config.option);
};

exports.VerifyToken = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, Config.publicKey);

  const currentUser = await User.findById(decoded.sub);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists", 401)
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

exports.decodedToken = (token) => {
  const decoded = jwt.decode(token);
  return decoded;
};
