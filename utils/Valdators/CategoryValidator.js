const { check } = require("express-validator");
const validatorMiddleware = require("../../Middlewares/ValidatorMiddleware");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id format"),
  validatorMiddleware,
];
exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category Name require")
    .isLength({ min: 3 })
    .withMessage('Too short Category name')
    .isLength({max:32})
    .withMessage('Too long Category name'),
    validatorMiddleware,
];
exports.updateCategoryValidator=[
    check("id").isMongoId().withMessage("Invalid Category Id format"),
    validatorMiddleware,
];
exports.deleteCategoryValidator=[
    check("id").isMongoId().withMessage("Invalid Category Id format"),
    validatorMiddleware,
];

