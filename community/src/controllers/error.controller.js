const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // eslint-disable-next-line no-console
    console.error("ERROR 💥", err);

    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

export default (err, res) => {
  // eslint-disable-next-line no-param-reassign
  err.statusCode = err.statusCode || 500;

  // eslint-disable-next-line no-param-reassign
  err.status = err || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    const error = { ...err };

    sendErrorProd(error, res);
  }
};
