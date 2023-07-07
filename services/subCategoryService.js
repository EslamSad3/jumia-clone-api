const SubCategory = require("../models/subCategorymodel");
const slugify = require("slugify");
const asynchandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

/*
    @desc       Create SubCategory
    @route      POST /api/v1/subcategories
    @access     Private
*/

exports.createSubCategory = asynchandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});


// @desc        Get List Of subCategories
// @route       GET /api/v1/subcategories
// @access      Public
exports.getSubCategories = asynchandler(async (req, res) => {
  // Pagnation
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const subcategories = await SubCategory.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: subcategories.length, page, data: subcategories });
});



// @desc        Get Specific subCategory by id
// @route       GET /api/v1/subcategories/:id
// @access      Public
exports.getSubCategory = asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategory.findById(id);
  if (!subcategory) {
    // res.status(404).json({ msg: `No Category For this id : ${id}` });
    return next(new ApiError(`No subcategory For this id : ${id}`, 404));
  }
  res.status(200).json({ data: subcategory });
});
