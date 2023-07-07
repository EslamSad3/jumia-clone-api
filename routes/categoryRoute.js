const express = require("express");
const {getCategoryValidator }= require("../utils/validators/categoryValidators")
const {deleteCategoryValidator }= require("../utils/validators/categoryValidators")
const {updateCategoryValidator }= require("../utils/validators/categoryValidators")
const {createCategoryValidator}= require("../utils/validators/categoryValidators")

const {
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  createCategory,
} = require("../services/categoryService");
const router = express.Router();
router.route("/").get(getCategories).post(createCategoryValidator,createCategory);
router
  .route("/:id")
  .get(
    getCategoryValidator,
    getCategory
  )
  .put(updateCategoryValidator,updateCategory)
  .delete(deleteCategoryValidator,deleteCategory);
module.exports = router;
