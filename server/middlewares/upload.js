import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "projects-cover-images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });
const parser = multer({ storage });

export const parseFormData = (req, res) =>
  new Promise((resolve, reject) => {
    parser.single("coverImage")(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

export default upload;
