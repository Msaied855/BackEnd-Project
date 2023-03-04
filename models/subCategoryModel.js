
const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "SubCategory must be uniqe"],
      minlength: [2, "Too short SubCategoryName"],
      maxlength: [32, "Too large SubCategoryName"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "subCategory must be belong to parent category"],
    },
  },
  { timestamps: true }
);
module.exports=mongoose.model("subCategory", subCategorySchema);
