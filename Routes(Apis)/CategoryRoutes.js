const express = require("express");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/Valdators/CategoryValidator");
const {
  getCategories,
  getCategory,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
  upLoadCategoryImage,
  resizeImage,
} = require("../controler/CategoryServices");

const router = express.Router();

const subcategoryRoute = require("./subCategoryRoutes");

router.use("/:categoryId/subcategories", subcategoryRoute);

router
  .route("/")
  .get(getCategories)
  .post(
    upLoadCategoryImage,
    resizeImage,
    createCategoryValidator,
    CreateCategory
  );
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(
    upLoadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    UpdateCategory
  )
  .delete(deleteCategoryValidator, DeleteCategory);
// this code above is better that the onw below
/*
router.get('/',getCategories);
router.post('/',CreateCategories);
*/

module.exports = router;
