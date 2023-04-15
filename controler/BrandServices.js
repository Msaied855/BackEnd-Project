const { v4: uuidv4 } = require("uuid");
//const asyncHandler = require("express-async-handler"); 
//const sharp = require("sharp");
const { upLoadSIngleImage } = require("../Middlewares/uploadImageMidleware");

const factory = require("./handlersFactory");
const Brand = require("../models/BrandModel");
// description  Get list of Brands
// route        Get /api/v1/Brands
// access       Public
exports.getBrands = factory.getAll(Brand);

//Erroe Handling
//1- then() catch(err)
//2- try()  catch(err)
//3- asyncHandler(async) ==> express error handler who gives us the erorr

exports.upLoadBrandImage =upLoadSIngleImage("image");

exports.resizeImage = (req, res, next) => {
  const filename = `Brand-${uuidv4()}-${Date.now()}.jpeg`;

  // save image in database
    req.body.image=filename;

  next();
};


// description  Get specific Brand by id
// route        Get /api/v1/Brands/:id
// acces        Public
exports.getBrand = factory.getOne(Brand);
// description  Create brand
// route        Post /api/v1/brands
// access       Private
exports.CreateBrand = factory.createOne(Brand);
//description   Update Brand
//route         Post /api/v1/brnads/:id
//access        Private
exports.UpdateBrand =factory.updateOne(Brand); 
//description   Delete spesific brand
//route         Delete /api/v1/brands/:id
//access        Private

exports.DeleteBrand = factory.deleteOne(Brand);

// exports.DeleteBrand = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const brand = await Brand.findByIdAndDelete(id);
//   if (!brand) {
//     return next(new ApiError(`No Brand for this id ${id}`, 404));
//   }
//   res.status(200).send();
// });
