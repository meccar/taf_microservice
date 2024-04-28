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
      message: "Someting went wrong",
    });
  }
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: res.message,
    stack: res.stack,
  });
};

module.exports = (err, res) => {
  // eslint-disable-next-line no-param-reassign
  err.statusCode = err.statusCode || 500;

  // eslint-disable-next-line no-param-reassign
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "developemt") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    const error = { ...err };

    sendErrorProd(error, res);
  }
};
