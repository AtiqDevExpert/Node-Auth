const express = require("express");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const {
  handleGetAllProductsCategories,
  handleCreateNewCategory,
  handleGetCategoryById,
  handleDeleteCategoryById,
  handleUpdateCategoryById,
} = require("../controllers/category");

const router = express.Router();
router.get("/", handleGetAllProductsCategories);
router
  .route("/category/:id")
  .get(handleGetCategoryById)
  .patch(handleUpdateCategoryById)
  .delete(handleDeleteCategoryById);
router.post(
  "/createcategory",
  upload.single("categoryImage"),
  handleCreateNewCategory
);

module.exports = router;
