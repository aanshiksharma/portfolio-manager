import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

const getAdmin = async (req, res) => {
  const admins = await Admin.find();

  if (admins.length === 0)
    return res.status(404).json({ message: "No admin found" });

  const admin = admins[0];
  res.status(200).json(admin);
};

// Add a new admin
// Password protected route
const addAdmin = async (req, res) => {
  const {
    name,
    email,
    password,
    mobile,
    portfolioLink,
    about,
    socialMediaLinks,
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new Admin({
    name,
    email,
    password: hashedPassword,
    mobile,
    portfolioLink,
    about,

    // Needs to be replaced with actual default file details
    resumeLink: "https://example.com/default-resume.pdf",

    profileImage: {
      fileName: "default-profile.png",
      firebasePath: "profiles/default-profile.png",
      url: "https://example.com/default-profile.png",
      uploadedAt: new Date(),
    },
    socialMediaLinks: socialMediaLinks,
  });
  await newAdmin.save();

  res
    .status(201)
    .json({ message: "Admin added successfully", admin: newAdmin });
};

// Update an existing admin
// Password protected route
const updateAdmin = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    email,
    password, // this password is not supposed to be updated. it will be used for validation only
    mobile,
    portfolioLink,
    about,
    socialMediaLinks,
  } = req.body;

  const admin = await Admin.findById(id);
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid)
    return res.status(401).json({ message: "Invalid password" });

  // Update fields if new values are provided
  admin.name = name || admin.name;
  admin.email = email || admin.email;
  admin.mobile = mobile || admin.mobile;
  admin.portfolioLink = portfolioLink || admin.portfolioLink;
  admin.about = about || admin.about;

  // Needs to be replaced with actual default file details
  admin.resumeLink =
    "https://example.com/changed-resume.pdf" || admin.resumeLink;
  admin.profileImage =
    {
      fileName: "changed-profile.png",
      firebasePath: "profiles/changed-profile.png",
      url: "https://example.com/changed-profile.png",
      uploadedAt: new Date(),
    } || admin.profileImage;
  admin.socialMediaLinks = socialMediaLinks || admin.socialMediaLinks;

  await admin.save();
  res.status(200).json({ message: "Admin updated successfully", admin });
};

// Change admin password
// Password protected route
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

export { getAdmin, updateAdmin, addAdmin, changePassword };
