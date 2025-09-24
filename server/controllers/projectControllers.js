import Project from "../models/Project.js";

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};

const addProject = async (req, res) => {
  res.json({ message: "Add project route is working!" });
};

const editProject = async (req, res) => {
  res.json({ message: "Edit project route is working!" });
};

export { getProjects, addProject, editProject };
