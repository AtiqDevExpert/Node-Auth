const { firebaseUploader } = require("../middleware/firebaseUploader");
const category = require("../models/category");

const handleGetAllProductsCategories = async (req, res) => {
  try {
    const allCategories = await category.find({});
    if (allCategories.length > 0) {
      return res.json({ Categories: allCategories });
    } else {
      return res.json({ errors: "no Category found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const handleGetCategoryById = async (req, res) => {
  try {
    const category = await category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "product not found" });
    return res.json(category);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const handleUpdateCategoryById = async (req, res) => {
  try {
    const category = await category.findByIdAndUpdate(req.params.id);

    const newData = req.body;
    if (category !== undefined) {
      // Exclude _id field from newData
      delete newData._id;
      const updatedPost = Object.assign(category, newData);
      await category.updateOne({ _id: req.params.id }, updatedPost);
      return res.status(201).json({
        message: "Record Updated Successfully",
        category: category._id,
      });
    } else {
      return res.status(404).json({
        message: "category not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const handleDeleteCategoryById = async (req, res) => {
  try {
    const deletedCategory = await products.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "product not found" });
    }
    if (deletedCategory) {
      return res.json({
        message: "Delete Successfully",
        product: deletedCategory,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const handleCreateNewCategory = async (req, res) => {
  try {
    const { categoryName, categoryImage } = req.body;

    if (!categoryName) {
      return res.status(400).json({ message: "Category Name Required" });
    }

    const newCategory = new category({ categoryName, categoryImage });
    await newCategory.save();

    // if (req.file) {
    //   const databseURL = await firebaseUploader(req.file);
    //   product.productImage = databseURL.downloadURL;
    // }

    return res
      .status(200)
      .json({ data: category, message: "category created successfully" });
  } catch (error) {
    console.error("Error creating new category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handleGetAllProductsCategories,
  handleCreateNewCategory,
  handleGetCategoryById,
  handleDeleteCategoryById,
  handleUpdateCategoryById,
};
