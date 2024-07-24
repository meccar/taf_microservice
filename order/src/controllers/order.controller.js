const handler = require("@tafvn/common");
const { Order } = require("../models/order.model");

exports.CreateOrder = handler.createOne(Order);
exports.GetAllOrders = handler.getAll(Order);
exports.GetOrder = handler.getOne(Order, "product");
exports.UpdateOrder = handler.updateOne(Order);
exports.DeleteOrder = handler.deleteOne(Order);
