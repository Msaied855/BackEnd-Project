const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../../Middlewares/ValidatorMiddleware");
const Category = require("../../models/CategoryModel");
const SubCategory = require("../../models/subCategoryModel");

exports.createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .notEmpty()
    .withMessage("Product title require"),
  check("description")
    .notEmpty()
    .withMessage("Desciption require")
    .isLength({ max: 2000 })
    .withMessage("Too long Desciption"),
  check("quantity")
    .notEmpty()
    .withMessage("product quantity is require")
    .isNumeric()
    .withMessage("Product Quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product Quantity must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product must have price")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("Too long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .toFloat()
    .withMessage(" priceAfterDiscount must be a number")
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("available colors must be in Array"),
  check("imageCover").notEmpty().withMessage("product imageCover is required"),
  check("images").optional().isArray().withMessage("images must be in Array"),
  check("category")
    .notEmpty()
    .withMessage("product must be belong to category")
    .isMongoId()
    .withMessage("Invalid Id format")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No caategory for this id${categoryId}`)
          );
        }
      })
    ),
  check("subcategory")
    .optional()
    .isMongoId()
    .withMessage("Invalid Id format")
    .custom((subcategoriesId) =>
      SubCategory.find({ _id: { $exists: true, $in: subcategoriesId } }).then(
        (result) => {
          if (result.length < 1 || result.length !== subcategoriesId.length) {
            return Promise.reject(new Error("Invalid SubCategories Ids"));
          }
        }
      )
    )
    .custom((val, { req }) =>
      SubCategory.find({ category: req.body.category }).then(
        (subcategories) => {
          const subcategoriesIdInDB = [];
          subcategories.forEach((subCategory) => {
            subcategoriesIdInDB.push(subCategory._id.toString());
          });
          if (!val.every((v) => subcategoriesIdInDB.includes(v))) {
            return Promise.reject(
              new Error("subcategories not belong to category")
            );
          }
        }
      )
    ),
  check("brand").optional().isMongoId().withMessage("Invalid Id format"),
  check("ratingAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingAverage must be a number"),
  validatorMiddleware,
];
exports.getProductValidator = [
  check("id").isMongoId().withMessage("invalid MongoId format"),
  validatorMiddleware,
];
exports.updateProductValidator = [
  check("id").isMongoId().withMessage("invalid MongoId format"),
  body("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];
exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("invalid MongoId format"),
  validatorMiddleware,
];
