const mongoose = require("mongoose");
//1- Create Schema
const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: [true, "the Brand must be uniqe"],
      minlength: [3, "Too short chracters"],
      maxlength: [32, "too much characters"],
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
module.exports = mongoose.model("Brand", BrandSchema);

