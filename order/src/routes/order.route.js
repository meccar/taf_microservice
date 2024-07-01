const express = require("express");

const router = express.Router({ mergeParams: true });

const { VerifyToken } = require("@tafvn/common");
const OrderController = require("../controllers/order.controller");

router
  .route("/")
  .get(OrderController.GetAllOrders)
  .post(VerifyToken, OrderController.CreateOrder);
router
  .route("/:id")
  .get(OrderController.GetOrder)
  .patch(VerifyToken, OrderController.UpdateOrder)
  .delete(VerifyToken, OrderController.DeleteOrder);

module.exports = router;
