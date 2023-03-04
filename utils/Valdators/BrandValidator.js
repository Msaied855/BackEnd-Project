const { check } = require("express-validator");
const validatorMiddleware = require("../../Middlewares/ValidatorMiddleware");

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id format"),
  validatorMiddleware,
];
exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand Name require")
    .isLength({ min: 3 })
    .withMessage('Too short Brand name')
    .isLength({max:32})
    .withMessage('Too long Brand name'),
    validatorMiddleware,
];
exports.updateBrandValidator=[
    check("id").isMongoId().withMessage("Invalid Brand Id format"),
    validatorMiddleware,
];
exports.deleteBrandValidator=[
    check("id").isMongoId().withMessage("Invalid Brand Id format"),
    validatorMiddleware,
];

