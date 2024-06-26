const { AppError } = require("./appError");
const { catchAsync } = require("./catchAsync");

const Validation = (schema) =>
  catchAsync(async (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errorMessages = error.details
        .map((detail) => detail.message)
        .join(", ");
      return next(new AppError(errorMessages, 400));
    }

    next();
  });

module.exports = { Validation };
