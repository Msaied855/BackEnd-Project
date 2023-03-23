const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../../Middlewares/ValidatorMiddleware");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory Id format"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory Name require")
    .isLength({ min: 2 })
    .withMessage("Too short SubCategory name")
    .isLength({ max: 32 })
    .withMessage("Too long SubCategory name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("sub Category must be belong to category ")
    .isMongoId()
    .withMessage("Invalid Category Id format"),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory Id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];
exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory Id format"),
  validatorMiddleware,
];
