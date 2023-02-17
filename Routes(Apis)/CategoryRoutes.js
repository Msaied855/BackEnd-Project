const express = require("express");

const {
  getCategories,
  getCategory,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
} = require("../controler/CategoryServices");

const router = express.Router();
router.route("/").get(getCategories).post(CreateCategory);
router
  .route("/:id")
  .get(getCategory)
  .put(UpdateCategory)
  .delete(DeleteCategory);
// this code above is better that the onw below
/*
router.get('/',getCategories);
router.post('/',CreateCategories);
*/

module.exports = router;
