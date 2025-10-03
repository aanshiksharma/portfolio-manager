import Category from "../models/Category.js";

const getCategories = async (req, res) => {
  const categories = await Category.find();

  if (categories.length === 0)
    return res.status(404).json({ message: "No Categories Found" });

  res.status(200).json(categories);
};

export { getCategories };
