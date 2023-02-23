const slugify = require("slugify");
const asyncHandler = require("express-async-handler"); // wrap the async await with this insted of using try catch
const Category = require("../models/CategoryModel");
const ApiError = require("../utils/apiError");

// description  Get list of categories
// route        Get /api/v1/categories
// access       Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
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
  const name = req.body.name;
  // async await
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});
//description   Update Category
//route         Post /api/v1/categories
//access        Private
exports.UpdateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new ApiError(`No Category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});
//description   Delete spesific category
//route         Delete /api/v1/categories
//access        Private
exports.DeleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiError(`No Category for this id ${id}`, 404));
  }
  res.status(200).send();
});
