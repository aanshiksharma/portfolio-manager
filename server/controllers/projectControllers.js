import Project from "../models/Project.js";
import { uploadProjectImage, deleteImage } from "./imageControllers.js";
import { parseProjectFormData } from "../middlewares/upload.js";

// Get all projects
const getProjects = async (req, res) => {
  const projects = await Project.find();

  if (projects.length === 0)
    return res.status(404).json({ message: "No projects found" });

  res.status(200).json(projects);
};

// Get a single project by ID
const getSingleProject = async (req, res) => {
  const id = req.params.id;

  const project = await Project.findById(id);
  if (!project) return res.status(404).json({ message: "Project not found" });

  res.status(200).json(project);
};

// Add a new project
// Password protected route
const addProject = async (req, res) => {
  await parseProjectFormData(req, res);

  const { title, skills, featured, description, projectLink, githubLink } =
    req.body;

  const existingProject = await Project.findOne({ projectLink });
  if (existingProject) {
    return res.status(409).json({ message: "Project already exists." });
  }

  if (!req.file) {
    return res.status(400).json({ message: "A cover image is required." });
  }

  // Upload to cloudinary
  const uploadResult = await uploadProjectImage(req.file.path);
  await deleteImage(req.file.filename);

  const coverImage = {
    fileName: req.file.originalname, // original name from user
    publicId: uploadResult.public_id, // Cloudinary’s ID
    url: uploadResult.secure_url, // Cloudinary’s URL
    uploadedAt: new Date(),
  };

  const newProject = new Project({
    title,
    skills: JSON.parse(skills),
    featured,
    description,
    projectLink,
    githubLink,

    // Other images will be handled with file upload logic later
    coverImage,
    otherImages: [],
  });
  await newProject.save();

  res.status(201).json({ message: "Project added successfully" });
};

// Edit an existing project
// Password protected route
const editProject = async (req, res) => {
  const id = req.params.id;

  await parseProjectFormData(req, res);

  const { title, skills, featured, description, projectLink, githubLink } =
    req.body;

  const project = await Project.findById(id);
  if (!project) return res.status(404).json({ message: "Project not found" });

  let coverImage;

  if (req.file) {
    // Upload to cloudinary
    const uploadResult = await uploadProjectImage(req.file.path);

    await deleteImage(req.file.filename);
    await deleteImage(project.coverImage.publicId);

    coverImage = {
      fileName: req.file.originalname, // original name from user
      publicId: uploadResult.public_id, // Cloudinary’s ID
      url: uploadResult.secure_url, // Cloudinary’s URL
      uploadedAt: new Date(),
    };
  } else {
    coverImage = project.coverImage;
  }

  project.title = title;
  project.skills = JSON.parse(skills);
  project.featured = featured !== undefined ? featured : project.featured;
  project.description = description;
  project.projectLink = projectLink;
  project.githubLink = githubLink;

  // Pictures will be handled with file upload logic later
  // For now, just retain existing images.
  project.coverImage = coverImage;
  project.otherImages = project.otherImages;

  await project.save();

  res.status(200).json({ message: "Project updated successfully" });
};

// Delete a project by ID
// Password protected route
const deleteProject = async (req, res) => {
  const id = req.params.id;

  const deletedProject = await Project.findByIdAndDelete(id);
  if (!deletedProject) res.status(404).json({ message: "Project not found" });

  // Delete image from cloudinary
  await deleteImage(deletedProject.coverImage.publicId);

  res
    .status(200)
    .json({ message: "Project Deleted Successfully", deletedProject });
};

export {
  getProjects,
  getSingleProject,
  addProject,
  editProject,
  deleteProject,
};
