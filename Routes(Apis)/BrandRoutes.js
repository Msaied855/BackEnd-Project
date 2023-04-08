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
  upLoadBrandImage,
  resizeImage,
} = require("../controler/BrandServices");

const router = express.Router();

router.route("/").get(getBrands).post(upLoadBrandImage,resizeImage,createBrandValidator, CreateBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(upLoadBrandImage,resizeImage,updateBrandValidator, UpdateBrand)
  .delete(deleteBrandValidator, DeleteBrand);

module.exports = router;
