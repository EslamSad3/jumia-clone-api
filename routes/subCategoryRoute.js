const express = require("express");
const {createsubCategoryValidator,getsubCategoryValidator} = require("../utils/validators/subCategoryValidators")
const {
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  createSubCategory,
} = require("../services/subCategoryService");

const router = express.Router();
router.route("/").post(createsubCategoryValidator,createSubCategory).get(getSubCategories);
router.route("/:id").get(getSubCategory);
// router
//   .route("/subcategory/:id")
//   .get(getSubCategory)
//   .put(updateSubCategory)
//   .delete(deleteSubCategory);

module.exports = router;
