import Skill from "../models/Skill.js";
import Category from "../models/Category.js";
import { generateSlug } from "../utils/generateSlug.js";

// Get all skills
const getSkills = async (req, res) => {
  const skills = await Skill.find();
  if (skills.length === 0)
    return res.status(404).json({
      message: "No skills found",
    });

  res.status(200).json(skills);
};

// Get all skills
const getSingleSkill = async (req, res) => {
  const slug = req.params.slug;
  const skill = await Skill.findOne({ slug });
  if (!skill)
    return res.status(404).json({
      message: "No skills found",
    });

  res.status(200).json(skill);
};

// Add a new skill
const addSkill = async (req, res) => {
  const { skillName, categoryName } = req.body;

  const slug = generateSlug(skillName);

  const existingSkill = await Skill.findOne({
    slug,
  });

  if (existingSkill) {
    return res.status(409).json({ message: "Skill already exists!" });
  }

  const existingCategory = await Category.findOne({ name: categoryName });
  const category = existingCategory
    ? existingCategory
    : new Category({ name: categoryName });

  if (!existingCategory) await category.save();

  const newSkill = new Skill({
    name: skillName,
    slug,
    category: category._id,
    categoryName: category.name,
  });
  await newSkill.save();

  return res.status(201).json({ message: "Skill Created!" });
};

// Edit an existing skill
const editSkill = async (req, res) => {
  const slug = req.params.slug;
  const { skillName, categoryName } = req.body;

  const skill = await Skill.findOne({ slug });
  if (!skill) return res.status(404).json({ message: "Skill not found!" });

  const finalSlug = generateSlug(skillName);
  const existingSlug = await Skill.findOne({
    slug: finalSlug,
    _id: { $ne: skill._id },
  });
  if (existingSlug)
    return res
      .status(409)
      .json({ message: "Skill with this name already exists!" });

  const existingCategory = await Category.findById({ _id: skill.category });
  const category = existingCategory
    ? existingCategory
    : new Category({ name: categoryName });

  if (!existingCategory) await category.save();

  skill.name = skillName;
  skill.slug = finalSlug;
  skill.category = category._id;
  skill.categoryName = category.name;
  await skill.save();

  res.status(200).json({ message: "Skill Updated!" });
};

// Delete a skill
const deleteSkill = async (req, res) => {
  const id = req.params.id;

  const skill = await Skill.findById({ _id: id });
  if (!skill)
    return res.status(404).json({
      message: "Skill not found",
    });

  await skill.deleteOne();

  res.status(200).json({ message: "Skill Deleted!" });
};

export { getSkills, getSingleSkill, addSkill, editSkill, deleteSkill };
