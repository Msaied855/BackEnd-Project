const slugify = require("slugify");
const asyncHandler = require("express-async-handler"); // wrap the async await with this insted of using try catch
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

const Brand = require("../models/BrandModel");
// description  Get list of Brands
// route        Get /api/v1/Brands
// access       Public
exports.getBrands = asyncHandler(async (req, res) => {
  //Build Query
  const documentCounts = await Brand.countDocuments();

  const apiFeatures = new ApiFeatures(Brand.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search()
    .limitFields()
    .sort();

  //Execute querywith (await)
  const { mongooseQuery, paginationResult } = apiFeatures;
  const brands = await mongooseQuery;

  res
    .status(200)
    .json({ results: brands.length, paginationResult, data: brands });
});
// description  Get specific Brand by id
// route        Get /api/v1/Brands/:id
// acces        Public
exports.getBrand = asyncHandler(async (req, res, next) => {
  //Erroe Handling
  //1- then() catch(err)
  //2- try()  catch(err)
  //3- asyncHandler(async) ==> express error handler who gives us the erorr
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new ApiError(`No Brand for this id ${id}`, 404));
  }

  res.status(200).json({ data: brand });
});
// description  Create brand
// route        Post /api/v1/brands
// access       Private
exports.CreateBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  // async await
  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});
//description   Update Brand
//route         Post /api/v1/brnads/:id
//access        Private
exports.UpdateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    return next(new ApiError(`No Brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});
//description   Delete spesific brand
//route         Delete /api/v1/brands/:id
//access        Private
exports.DeleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError(`No Brand for this id ${id}`, 404));
  }
  res.status(200).send();
});
