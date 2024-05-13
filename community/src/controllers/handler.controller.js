const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");
// const APIFeatures = require("../util/apiFeatures");

exports.deleteOne = (Model) => catchAsync( async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError("No document found with that ID", 404))
    }
});