const express = require("express");
const {
  handleGetAllInvoices,
  handleCreateNewInvoice,
  handleUpdateInvoiceProducts,
} = require("../controllers/invoices");

const router = express.Router();

router.get("/", handleGetAllInvoices);
router.post("/createinvoice", handleCreateNewInvoice);
router.patch("/updateinvoiceproducts", handleUpdateInvoiceProducts);

module.exports = router;
