// const catchAsync = require("../utils/catchAsync");
// const AppError = require("../utils/appError");
// const APIFeatures = require("../utils/apiFeatures");
// const PublishMessage = require("../config/messages");
// const { CUSTOMER_BINDING_KEY } = require("../config/config");
const { catchAsync, AppError, APIFeatures } = require("@tafvn/common");
const ProductCreatedPublisher = require("../events/publishers/product.created.publisher");
const ProductUpdatedPublisher = require("../events/publishers/product.updated.publisher");
const { natsWrapper } = require("../nats-wrapper");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    // PublishMessage(req.channel, CUSTOMER_BINDING_KEY, JSON.stringify(doc));

    return res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findBYIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    await new ProductUpdatedPublisher(natsWrapper.client).publish(doc);
    // PublishMessage(req.channel, CUSTOMER_BINDING_KEY, JSON.stringify(doc));

    return res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    await new ProductCreatedPublisher(natsWrapper.client).publish(doc);
    // PublishMessage(req.channel, CUSTOMER_BINDING_KEY, JSON.stringify(doc));

    return res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = await Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;

    if (!doc) {
      return next("No document found with that ID", 404);
    }

    // PublishMessage(req.channel, CUSTOMER_BINDING_KEY, JSON.stringify(doc));

    return res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    // if (req.params.postID) filter = { post : req.params.postID }
    if (req.params.communityID) filter = { community: req.params.communityID };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    // PublishMessage(req.channel, CUSTOMER_BINDING_KEY, JSON.stringify(doc));

    return res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
