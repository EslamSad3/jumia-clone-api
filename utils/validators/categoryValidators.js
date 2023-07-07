const {check} = require("express-validator")
const validatorMiddleWare = require("../../middlewares/validatorErrorMiddleWare")

exports.getCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid MongoID"),
    validatorMiddleWare
]
exports.deleteCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid MongoID"),
    validatorMiddleWare
]
exports.updateCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid MongoID"),
    validatorMiddleWare
]

exports.createCategoryValidator =[
    check("name").notEmpty().withMessage("Name Required").isLength({min:3}).withMessage("Too Short").isLength({max:32}).withMessage("Too Long"),
    validatorMiddleWare
] 