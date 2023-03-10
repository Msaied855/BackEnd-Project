const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const SubCategory = require("../models/subCategoryModel");

// description  Create subcategory
// route        Post /api/v1/subcategories
// access       Private

exports.setCategoryIdToBody=(req,res,next)=>{
//Nested route
if(!req.body.category) req.body.category=req.params.categoryId;
next(); 
};
exports.CreateSubCategory = asyncHandler(async (req, res) => {


  const { name, category } = req.body;
  // async await
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});
//Nested route
//Get /api/v1/categories/:categoryId/subcategories

// description  Get list of subcategories
// route        Get /api/v1/subcategories
// access       Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  let filter = {};
  if (req.params.categoryId) filter = { category: req.params.categoryId };

  const subcategories = await SubCategory.find(filter).skip(skip).limit(limit);
  res
    .status(200)
    .json({ results: subcategories.length, page, data: subcategories });
});
// description  Get specific subcategory by id
// route        Get /api/v1/subcategories/:id
// acces        Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  //Erroe Handling
  //1- then() catch(err)
  //2- try()  catch(err)
  //3- asyncHandler(async) ==> express error handler who gives us the erorr
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    return next(new ApiError(`No subCategory for this id ${id}`, 404));
  }

  res.status(200).json({ data: subCategory });
});
//description   Update subCategory
//route         Post /api/v1/subCategories/:id
//access        Private
exports.UpdateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name), category },
    { new: true }
  );
  if (!subCategory) {
    return next(new ApiError(`No subCategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});
//description   Delete spesific subCategory
//route         Delete /api/v1/subCategories/:id
//access        Private
exports.DeleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new ApiError(`No subCategory for this id ${id}`, 404));
  }
  res.status(200).send();
});
