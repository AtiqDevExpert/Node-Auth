const invoices = require("../models/invoices");
const products = require("../models/products");
const handleGetAllInvoices = async (req, res) => {
  try {
    const allInvoices = await invoices.find({});
    if (allInvoices.length > 0) {
      return res.json({ invoices: allInvoices });
    } else {
      return res.json({ errors: "no result found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleCreateNewInvoice = async (req, res) => {
  try {
    const { invoiceProducts, invoiceTotalPrice } = req.body;

    if (!invoiceProducts || !invoiceTotalPrice) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new invoice instance
    const invoice = new invoices({
      invoiceProducts,
      invoiceTotalPrice,
    });

    await invoice.save();

    return res
      .status(200)
      .json({ invoice: invoice, message: "order placed successfully" });
  } catch (error) {
    console.error("Error creating new invoice:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const handleUpdateInvoiceProducts = async (req, res) => {
  try {
    const invoiceProducts = req.body;

    for (const element of invoiceProducts) {
      const product = await products.findByIdAndUpdate(element._id);

      if (product !== undefined) {
        const totalSellQuantity =
          product.productSellQuantity + element?.productInvoiceQuantity;
        const productRemainingQuantity =
          product?.productTotalQuantity - totalSellQuantity;
        product.productRemainingQuantity = productRemainingQuantity;
        product.productSellQuantity = totalSellQuantity;

        await product.save();
      } else {
        return res.status(404).json({
          message: "Product not found",
        });
      }
    }
    return res.status(201).json({
      message: "Products Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  handleGetAllInvoices,
  handleCreateNewInvoice,
  handleUpdateInvoiceProducts,
};
