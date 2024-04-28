const sendErrorProd = (err, res) => {
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    } else {
        console.error("ERROR 💥", err);

        res.status(500).json({
            status: "error",
            message: "Someting went wrong",
        })
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

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV = "developemt") {
        sendErrorDev(err, res)
    } else if (process.env.NODE_ENV = "production") {
        let error = { ...err };

        sendErrorProd(error, res);
    }
};