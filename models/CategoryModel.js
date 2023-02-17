const mongoose = require("mongoose");
//1- Create Schema
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "the category must be uniqe"],
      minlength: [3, "Too short chracters"],
      maxlength: [30, "too much characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
      image:String,
  },
  { timestamps: true }
);
// 2-create model
const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
