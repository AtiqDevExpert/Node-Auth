const mongoose = require("mongoose");
// Schemas for posts
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
      required: false,
    },

    productTotalQuantity: {
      type: Number,
      required: true,
    },
    productSellQuantity: {
      type: Number,
      required: false,
    },
    productRemainingQuantity: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const products = mongoose.model("products", productSchema);

module.exports = products;
