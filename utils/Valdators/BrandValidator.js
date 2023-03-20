const slugify = require("slugify");
const { check, body } = require("express-validator");
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
    .withMessage("Too short Brand name")
    .isLength({ max: 32 })
    .withMessage("Too long Brand name"),
  validatorMiddleware,
];
exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];
exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];
