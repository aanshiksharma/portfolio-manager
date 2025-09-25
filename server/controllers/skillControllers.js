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
  const id = req.params.id;
  const { skillName, categoryName } = req.body;

  const skill = await Skill.findById({ _id: id });
  skill.name = skillName;

  const category = await Category.findOne({ name: categoryName });

  if (!category) {
    const newCategory = new Category({ name: categoryName });
    await newCategory.save();

    skill.category = newCategory._id;
    await skill.save();

    return res.status(200).json({ message: "Skill Updated!" });
  }

  skill.category = category._id;
  await skill.save();

  res.status(200).json({ message: "Skill Updated!" });
};

// Delete a skill
const deleteSkill = async (req, res) => {
  const id = req.params.id;

  try {
    const skill = await Skill.findById({ _id: id });

    if (!skill) return res.status(404).json({ message: "Skill not found" });

    await skill.deleteOne();

    res.status(200).json({ message: "Skill Deleted!" });
  } catch (err) {
    res.status(500).json({ message: `Error deleting skill ${err}` });
  }
};

export { getSkills, addSkill, editSkill, deleteSkill };
