const express = require("express");

const router = express.Router({ mergeParams: true });

const { VerifyToken } = require("@tafvn/common");
const OrderController = require("../controllers/order.controller");
const { redisCaching } = require("../utils/redis");
const checkOrder = require("../middlewares/order.middleware");

router
  .route("/")
  .get(redisCaching, OrderController.GetAllOrders)
  .post(VerifyToken, redisCaching, checkOrder, OrderController.CreateOrder);
router
  .route("/:id")
  .get(VerifyToken, redisCaching, OrderController.GetOrder)
  .patch(VerifyToken, redisCaching, OrderController.UpdateOrder)
  .delete(VerifyToken, redisCaching, OrderController.DeleteOrder);

module.exports = router;
