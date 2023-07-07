const Category = require("../models/categoryModel");
const slugify = require("slugify");
const asynchandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

// @desc        Get List Of Categories
// @route       GET /api/v1/category
// @access      Public

exports.getCategories = asynchandler(async (req, res) => {
  // Pagnation
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

// @desc        Get Specific Category by id
// @route       GET /api/v1/categories/:id
// @access      Public

exports.getCategory = asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    // res.status(404).json({ msg: `No Category For this id : ${id}` });
    return next(new ApiError(`No Category For this id : ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc        Craete Category
// @route       POST /api/v1/category
// @access      Private

// async await
exports.createCategory = asynchandler(async (req, res) => {
  const {name} = req.body;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// promise

/*
exports.createCategory = async (req, res) => {
  const name = req.body.name;
  Category.create({name,slug: slugify(name)}).then((category) => res.status(201).json({ data: category })).catch((err) => res.status(400).send(err));
*/

// @desc        Update Specific Category
// @route       PUT /api/v1/categories/:id
// @access      Private

exports.updateCategory = asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  ); // new => returns cat after update
  if (!category) {
    // res.status(404).json({msg:`No Category For this ID : ${id}`})
    return next(new ApiError(`No Category For this id : ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc        Delete Specific Category
// @route       DELETE /api/v1/categories/:id
// @access      Private

exports.deleteCategory = asynchandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findOneAndDelete({ _id: id }, { new: true });
  if (!category) {
    // res.status(404).json({msg:`No Category For this ID : ${id}`})
    return next(new ApiError(`No Category For this id : ${id}`, 404));
  }
  res.status(204).send();
});
