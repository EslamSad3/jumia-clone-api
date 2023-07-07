const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: [true, "subCategory Must Be Uniquie"],
            minlength: [2, "Too Short Name"],
            maxlength: [32, "Too Long Name"],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        image: String,
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'category',
            required: [true, "SubCategory Must belong to Parent Category"]
        }
    },
    { timeseries: true }
);


module.exports = mongoose.model("SubCategory", subCategorySchema)