const factory=require("./handlersFactory");
const Product = require("../models/ProductModel");

// description  Get list of products
// route        Get /api/v1/products
// access       Public
exports.getProducts = factory.getAll(Product,"Products");
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
exports.getProduct = factory.getOne(Product);
// description  Create product
// route        Post /api/v1/products
// access       Private
exports.CreateProduct =factory.createOne(Product);
//description   Update product
//route         Post /api/v1/products/:id
//access        Private
exports.UpdateProduct = factory.updateOne(Product); 
//description   Delete spesific product
//route         Delete /api/v1/products/:id
//access        Private

exports.DeleteProduct=factory.deleteOne(Product);
// exports.DeleteProduct = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const product = await Product.findByIdAndDelete(id);
//   if (!product) {
//     return next(new ApiError(`No Product for this id ${id}`, 404));
//   }
//   res.status(200).send();
// });
