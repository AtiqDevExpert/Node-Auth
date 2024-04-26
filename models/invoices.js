const mongoose = require("mongoose");
// Schemas for invoices
const invoicesSchema = new mongoose.Schema(
  {
    invoiceProducts: {
      type: [
        {
          productName: String,
          productQuantity: Number,
          productPrice: Number,
          // Add other fields as needed
        },
      ],
      required: true,
    },

    invoiceTotalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const invoices = mongoose.model("invoices", invoicesSchema);

module.exports = invoices;
