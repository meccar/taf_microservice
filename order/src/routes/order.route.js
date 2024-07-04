const express = require("express");

const router = express.Router({ mergeParams: true });

const { VerifyToken } = require("@tafvn/common");
const OrderController = require("../controllers/order.controller");
const {redisCaching} = require("../utils/redis")

router
  .route("/")
  .get(redisCaching, OrderController.GetAllOrders)
  .post(VerifyToken, redisCaching, OrderController.CreateOrder);
router
  .route("/:id")
  .get(redisCaching, OrderController.GetOrder)
  .patch(VerifyToken, redisCaching, OrderController.UpdateOrder)
  .delete(VerifyToken, redisCaching,OrderController.DeleteOrder);

module.exports = router;
