const express = require("express");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/Valdators/BrandValidator");
const {
  getBrands,
  getBrand,
  CreateBrand,
  UpdateBrand,
  DeleteBrand,
} = require("../controler/BrandServices");

const router = express.Router();

router.route("/").get(getBrands).post(createBrandValidator, CreateBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, UpdateBrand)
  .delete(deleteBrandValidator, DeleteBrand);

module.exports = router;
