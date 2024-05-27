// const catchAsync = require("../utils/catchAsync");
const handler = require("./handler.controller");
const Product = require("../models/product.model")

exports.CreateProduct = handler.createOne(Product);
exports.GetAllProducts = handler.getAll(Product);
exports.GetProduct = handler.getOne(Product);
exports.UpdateProduct = handler.updateOne(Product);
exports.DeleteProduct = handler.deleteOne(Product);
