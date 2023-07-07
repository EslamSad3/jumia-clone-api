const { check } = require("express-validator");
const validatorMiddleWare = require("../../middlewares/validatorErrorMiddleWare");

exports.getsubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid MongoID"),
  validatorMiddleWare,
];
// exports.deletesubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid MongoID"),
//   validatorMiddleWare,
// ];
// exports.updatesubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid MongoID"),
//   validatorMiddleWare,
// ];

exports.createsubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name Required")
    .isLength({ min: 2 })
    .withMessage("Too Short")
    .isLength({ max: 32 })
    .withMessage("Too Long"),
  check("category")
    .isMongoId()
    .withMessage("Invalid cat ID")
    .notEmpty()
    .withMessage("Category ID Required"),
  validatorMiddleWare,
];
