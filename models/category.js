const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
    categoryImage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const category = mongoose.model("category", categorySchema);

module.exports = category;
