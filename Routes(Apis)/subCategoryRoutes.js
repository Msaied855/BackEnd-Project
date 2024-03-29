const express = require("express");

const {
  CreateSubCategory,
  getSubCategory,
  getSubCategories,
  UpdateSubCategory,
  DeleteSubCategory,
  setCategoryIdToBody,
  createFilterObj,
} = require("../controler/SubCategoryServices");

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator
} = require("../utils/Valdators/SupCategoryValidator");

const router = express.Router({mergeParams:true});

router
  .route("/")
  .post(setCategoryIdToBody,createSubCategoryValidator, CreateSubCategory)
  .get(createFilterObj,getSubCategories);

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator,UpdateSubCategory)
  .delete(deleteSubCategoryValidator,DeleteSubCategory);

module.exports = router;
