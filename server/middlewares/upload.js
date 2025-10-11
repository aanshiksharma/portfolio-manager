import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../config/cloudinary.js";

const projectsStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "projects-cover-images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const adminStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "admin-profile-images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const adminFormParser = multer({ storage: adminStorage });
const projectFormParser = multer({ storage: projectsStorage });

export const parseProjectFormData = (req, res) =>
  new Promise((resolve, reject) => {
    projectFormParser.single("coverImage")(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

export const parseAdminFormData = (req, res) =>
  new Promise((resolve, reject) => {
    adminFormParser.single("profileImage")(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
