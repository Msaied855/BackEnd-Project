const slugify = require("slugify");
const asyncHandler = require("express-async-handler"); // wrap the async await with this insted of using try catch
const Category = require("../models/CategoryModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory=require("./handlersFactory");


// description  Get list of categories
// route        Get /api/v1/categories
// access       Public
exports.getCategories = asyncHandler(async (req, res) => {
  const documentCounts = await Category.countDocuments();

  const apiFeatures = new ApiFeatures(Category.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search()
    .limitFields()
    .sort();

  //Execute query with (await)
  const { mongooseQuery, paginationResult } = apiFeatures;
  const categories = await mongooseQuery;

  res
    .status(200)
    .json({ results: categories.length, paginationResult, data: categories });
});
// description  Get specific category by id
// route        Get /api/v1/categories/:id
// acces        Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  //Erroe Handling
  //1- then() catch(err)
  //2- try()  catch(err)
  //3- asyncHandler(async) ==> express error handler who gives us the erorr
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(`No Category for this id ${id}`, 404));
  }

  res.status(200).json({ data: category });
});
// description  Create category
// route        Post /api/v1/categories
// access       Private
exports.CreateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  // async await
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});
//description   Update Category
//route         Post /api/v1/categories/:id
//access        Private
exports.UpdateCategory = factory.updateOne(Category); 
//description   Delete spesific category
//route         Delete /api/v1/categories/:id
//access        Private

exports.DeleteCategory = factory.deleteOne(Category);

// exports.DeleteCategory = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const category = await Category.findByIdAndDelete(id);
//   if (!category) {
//     return next(new ApiError(`No Category for this id ${id}`, 404));
//   }
//   res.status(200).send();
// });
