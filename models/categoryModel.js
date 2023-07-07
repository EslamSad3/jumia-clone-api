const mongoose = require("mongoose");

// create schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Required"],
      unique: [true, "Categort Must be Unique"],
      minlength: [3, "Too Short Name"],
      maxlength: [32, "Too Long Name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String
  },
  { timestamps: true }
);
// create model
const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
