import Project from "../models/Project.js";

// Get all projects
const getProjects = async (req, res) => {
  const projects = await Project.find();

  if (projects.length === 0)
    res.status(404).json({ message: "No projects found" });

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
  const { title, skills, featured, description, projectLink, githubLink } =
    req.body;

  const newProject = new Project({
    title,
    skills,
    featured,
    description,
    projectLink,
    githubLink,

    // Cover image and other images will be handled with file upload logic later
    coverImage: {
      fileName: "default-cover.png",
      firebasePath: "projects/default-cover.png",
      url: "https://example.com/default-cover.png",
      uploadedAt: new Date(),
    },
    otherImages: [],
  });
  await newProject.save();

  res.status(201).json({ message: "Project added successfully" });
};

// Edit an existing project
// Password protected route
const editProject = async (req, res) => {
  const id = req.params.id;
  const { title, skills, featured, description, projectLink, githubLink } =
    req.body;

  const project = await Project.findById(id);
  if (!project) return res.status(404).json({ message: "Project not found" });

  project.title = title || project.title;
  project.skills = skills || project.skills;
  project.featured = featured !== undefined ? featured : project.featured;
  project.description = description || project.description;
  project.projectLink = projectLink || project.projectLink;
  project.githubLink = githubLink || project.githubLink;

  // Pictures will be handled with file upload logic later
  // For now, just retain existing images.
  project.coverImage = project.coverImage;
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
