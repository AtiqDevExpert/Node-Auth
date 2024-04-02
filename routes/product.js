const express = require("express");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const {
  handleGetAllProducts,
  handleGetProductById,
  handleUpdateProductById,
  handleDeleteProductbyId,
  handleCreateNewProduct,
  handleGetAllProductsCategories,
} = require("../controllers/product");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", handleGetAllProducts);
router.get("/allcategories", handleGetAllProductsCategories);

router
  .route("/products/:id")
  .get(handleGetProductById)
  .patch(handleUpdateProductById)
  .delete(handleDeleteProductbyId);
router.post(
  "/createproduct",
  upload.single("productImage"),
  handleCreateNewProduct
);

module.exports = router;
