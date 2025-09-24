import Skill from "../models/Skill.js";
import Category from "../models/Category.js";

// Get all skills
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json({ message: "Error fetching skills" });
  }
};

// Add a new skill
const addSkill = async (req, res) => {
  const { skillName, categoryName } = req.body;

  try {
    const existingCategory = await Category.findOne({ name: categoryName });

    if (!existingCategory) {
      const newCategory = new Category({ name: categoryName });
      await newCategory.save();

      const newSkill = new Skill({
        name: skillName,
        category: newCategory._id,
      });
      await newSkill.save();

      return res.status(201).json({ message: "Skill Created!" });
    }

    const existingSkill = await Skill.findOne({ name: skillName });

    if (existingSkill) {
      return res.status(400).json({ message: "Skill already exists!" });
    }

    const newSkill = new Skill({
      name: skillName,
      category: existingCategory._id,
    });
    await newSkill.save();

    return res.status(201).json({ message: "Skill Created!" });
  } catch (err) {
    res.status(500).json({ message: "Error creating skill" + err.message });
  }
};

// Edit an existing skill
const editSkill = async (req, res) => {
  res.json({ message: "Edit skill route is working!" });
};

export { getSkills, addSkill, editSkill };
