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
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: false,
    },

    productTotalQuantity: {
      type: String,
      required: true,
    },
    productSellQuantity: {
      type: String,
      required: false,
    },
    productRemainingQuantity: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const products = mongoose.model("products", productSchema);

module.exports = products;
