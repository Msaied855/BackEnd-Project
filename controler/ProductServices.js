const slugify = require("slugify");
const asyncHandler = require("express-async-handler"); // wrap the async await with this insted of using try catch
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

const Product = require("../models/ProductModel");

// description  Get list of products
// route        Get /api/v1/products
// access       Public
exports.getProducts = asyncHandler(async (req, res) => {
  const documentCounts = await Product.countDocuments();
  //Build Query
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search("Products")
    .limitFields()
    .sort();

  //Execute querywith (await)
  const { mongooseQuery, paginationResult } = apiFeatures;
  const products = await mongooseQuery;
  res
    .status(200)
    .json({ results: products.length, paginationResult, data: products });
});
//3)Sorting Feature
/*
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    mongooseQuery = mongooseQuery.sort(sortBy);
  }
  */
//4)Fields Limiting
/*
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    mongooseQuery = mongooseQuery.select(fields);
  }
  */
//5)Search Feature
/*
  if (req.query.keyword) {
    const query = {};
    query.$or = [
      { title: { $regex: req.query.keyword, $options: "i" } },
      { description: { $regex: req.query.keyword, $options: "i" } },
    ];
    mongooseQuery = mongooseQuery.find(query);
  }
  */
// description  Get specific product by id
// route        Get /api/v1/products/:id
// acces        Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  //Erroe Handling
  //1- then() catch(err)
  //2- try()  catch(err)
  //3- asyncHandler(async) ==> express error handler who gives us the erorr
  const { id } = req.params;
  const product = await Product.findById(id).populate({
    path: "category",
    select: "name-_id",
  });
  if (!product) {
    return next(new ApiError(`No Product for this id ${id}`, 404));
  }

  res.status(200).json({ data: product });
});
// description  Create product
// route        Post /api/v1/products
// access       Private
exports.CreateProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});
//description   Update product
//route         Post /api/v1/products/:id
//access        Private
exports.UpdateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`No Product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});
//description   Delete spesific product
//route         Delete /api/v1/products/:id
//access        Private
exports.DeleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError(`No Product for this id ${id}`, 404));
  }
  res.status(200).send();
});
