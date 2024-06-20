const express = require("express");

const router = express.Router({ mergeParams: true });

const { VerifyToken } = require("@tafvn/common");
const ProductController = require("../controllers/product.controller");

router
  .route("/")
  .get(ProductController.GetAllProducts)
  .post(VerifyToken, ProductController.CreateProduct);
router
  .route("/:id")
  .get(ProductController.GetProduct)
  .patch(VerifyToken, ProductController.UpdateProduct)
  .delete(VerifyToken, ProductController.DeleteProduct);

module.exports = router;
