const factory = require("./handlersFactory");

const SubCategory = require("../models/subCategoryModel");

exports.setCategoryIdToBody = (req, res, next) => {
  //Nested route(Creat)
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// Nested route(Get)
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

// description  Get list of subcategories
// route        Get /api/v1/subcategories
// access       Public
exports.getSubCategories = factory.getAll(SubCategory);
// description  Create subcategory
// route        Post /api/v1/subcategories
// access       Private
exports.CreateSubCategory = factory.createOne(SubCategory);
// description  Get specific subcategory by id
// route        Get /api/v1/subcategories/:id
// acces        Public

exports.getSubCategory = factory.getOne(SubCategory);
//description   Update subCategory
//route         Post /api/v1/subCategories/:id
//access        Private
exports.UpdateSubCategory = factory.updateOne(SubCategory);
//description   Delete spesific subCategory
//route         Delete /api/v1/subCategories/:id
//access        Private
exports.DeleteSubCategory = factory.deleteOne(SubCategory);

// exports.DeleteSubCategory = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const subCategory = await SubCategory.findByIdAndDelete(id);
//   if (!subCategory) {
//     return next(new ApiError(`No subCategory for this id ${id}`, 404));
//   }
//   res.status(200).send();
// });
