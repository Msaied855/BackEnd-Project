// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require("multer");
// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require("uuid");
const Category = require("../models/CategoryModel");

const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");

//1-diskStorage engine
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categories");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const filename = `category${uuidv4()}-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});
const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("imag")) {
    cb(null, true);
  } else {
    cb(new ApiError("only Images Allowed", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.upLoadCategoryImage = upload.single("image");
// description  Get list of categories
// route        Get /api/v1/categories
// access       Public
exports.getCategories = factory.getAll(Category);
// description  Get specific category by id
// route        Get /api/v1/categories/:id
// acces        Public
exports.getCategory = factory.getOne(Category);
// description  Create category
// route        Post /api/v1/categories
// access       Private
exports.CreateCategory = factory.createOne(Category);
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
