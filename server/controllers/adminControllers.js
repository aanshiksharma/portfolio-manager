import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

import { parseAdminFormData } from "../middlewares/upload.js";
import { deleteImage, uploadAdminImage } from "./imageControllers.js";

const getAdmin = async (req, res) => {
  const admins = await Admin.find();

  if (admins.length === 0)
    return res.status(404).json({ message: "No admin found" });

  const admin = admins[0];
  res.status(200).json(admin);
};

const getAdminById = async (req, res) => {
  const id = req.params.id;
  const admin = await Admin.findById(id);

  if (!admin)
    return res.status(404).json({
      message: "Admin not found",
    });

  res.status(200).json(admin);
};

// Update an existing admin
const updateAdmin = async (req, res) => {
  const id = req.params.id;

  const admin = await Admin.findById(id);
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  await parseAdminFormData(req, res);

  const {
    name,
    email,
    mobile,
    portfolioLink,
    about,
    socialMediaLinks,
    resumeLink,
  } = req.body;

  const uploadResult = req.file && (await uploadAdminImage(req.file.path));
  req.file && (await deleteImage(req.file.filename));
  await deleteImage(admin.profileImage.publicId);

  const profileImage = req.file && {
    fileName: req.file.originalname,
    publicId: uploadResult.public_id,
    url: uploadResult.secure_url,
    uploadedAt: new Date(),
  };

  // Update fields if new values are provided
  admin.name = name;
  admin.email = email;
  admin.mobile = mobile;
  admin.portfolioLink = portfolioLink;
  admin.about = JSON.parse(about);
  admin.resumeLink = resumeLink;
  admin.socialMediaLinks = JSON.parse(socialMediaLinks);

  admin.profileImage = req.file ? profileImage : admin.profileImage;

  await admin.save();
  res.status(200).json({ message: "Admin updated successfully", admin });
};

// Change admin password
const changePassword = async (req, res) => {
  const id = req.params.id;
  const { oldPassword, newPassword } = req.body;

  const admin = await Admin.findById(id);
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const isOldPasswordValid = await bcrypt.compare(oldPassword, admin.password);
  if (!isOldPasswordValid)
    return res.status(401).json({ message: "Old password is invalid" });

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  admin.password = hashedNewPassword;
  await admin.save();

  res.status(200).json({ message: "Password changed successfully" });
};

export { getAdmin, getAdminById, updateAdmin, changePassword };
