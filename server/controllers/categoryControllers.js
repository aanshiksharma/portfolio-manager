import Category from "../models/Category.js";

const getCategories = async (req, res) => {
  const categories = await Category.find();

  if (categories.length === 0)
    return res.status(404).json({ message: "No Categories Found" });

  res.status(200).json(categories);
};

const getCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findById(categoryId);

  if (!category)
    return res.status(404).json({ message: "Category Not Found!" });

  res.status(200).json(category);
};

export { getCategories, getCategoryById };
