const express = require("express");

const router = express.Router({ mergeParams: true });

const ProductController = require("../controllers/product.controller");

router
  .route("/")
  .get(ProductController.GetAllProducts)
  .post(ProductController.CreateProduct);
router
  .route("/:id")
  .get(ProductController.GetProduct)
  .patch(ProductController.UpdateProduct)
  .delete(ProductController.DeleteProduct);

module.exports = router;
