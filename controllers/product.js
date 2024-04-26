const { firebaseUploader } = require("../middleware/firebaseUploader");

const products = require("../models/products");
const handleGetAllProducts = async (req, res) => {
  try {
    const allProducts = await products.find({});
    if (allProducts.length > 0) {
      return res.json({ products: allProducts });
    } else {
      return res.json({ errors: "no result found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleGetProductById = async (req, res) => {
  try {
    const product = await products.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "product not found" });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const handleUpdateProductById = async (req, res) => {
  try {
    const product = await products.findByIdAndUpdate(req.params.id);

    const newData = req.body;
    if (product !== undefined) {
      // Exclude _id field from newData
      delete newData._id;
      const updatedPost = Object.assign(product, newData);
      await products.updateOne({ _id: req.params.id }, updatedPost);
      return res.status(201).json({
        message: "Record Updated Successfully",
        product: product._id,
      });
    } else {
      return res.status(404).json({
        message: "product not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const handleDeleteProductbyId = async (req, res) => {
  try {
    const deletedPost = await products.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "product not found" });
    }
    if (deletedPost) {
      return res.json({ message: "Delete Successfully", product: deletedPost });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const handleCreateNewProduct = async (req, res) => {
  try {
    const {
      productName,
      productPrice,
      productDescription,
      productTotalQuantity,
      productImage,
      productCategory,
    } = req.body;

    if (
      !productName ||
      !productPrice ||
      !productDescription ||
      !productTotalQuantity ||
      !productCategory ||
      !productImage
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new product instance
    const product = new products({
      productName,
      productDescription,
      productPrice,
      productTotalQuantity,
      productImage,
      productCategory,
    });

    if (req.file) {
      const databseURL = await firebaseUploader(req.file);
      product.productImage = databseURL.downloadURL;
    }

    await product.save();

    return res
      .status(200)
      .json({ data: product, message: "Product created successfully" });
  } catch (error) {
    console.error("Error creating new product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handleGetAllProducts,
  handleGetProductById,
  handleUpdateProductById,
  handleDeleteProductbyId,
  handleCreateNewProduct,
};
