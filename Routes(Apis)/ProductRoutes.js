const express = require("express");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/Valdators/ProductValidator");
const {
  getProducts,
  getProduct,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../controler/ProductServices");

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(createProductValidator, CreateProduct);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, UpdateProduct)
  .delete(deleteProductValidator, DeleteProduct);

module.exports = router;
