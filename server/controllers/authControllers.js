import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";
import Guest from "../models/Guest.js";

import { parseAdminFormData } from "../middlewares/upload.js";
import { deleteImage, uploadAdminImage } from "./imageControllers.js";

// Add a new admin
// This Route is protected by a password stored in the environment variables
const adminRegister = async (req, res) => {
  await parseAdminFormData(req, res);

  const {
    name,
    email,
    password,
    secretPassword,
    mobile,
    about,
    portfolioLink,
    resumeLink,
    socialMediaLinks,
  } = req.body;

  const addAdminPassword = process.env.ADD_ADMIN_PASSWORD;
  if (secretPassword !== addAdminPassword) {
    return res.status(401).json({
      message: "Wrong Password! Cannot add admin.",
    });
  }

  try {
    const uploadResult = req.file && (await uploadAdminImage(req.file.path));
    await deleteImage(req.file.filename);

    const profileImage = {
      fileName: req.file ? req.file.originalname : "",
      publicId: req.file ? uploadResult.public_id : "",
      url: req.file ? uploadResult.secure_url : "",
      uploadedAt: new Date(),
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      about: JSON.parse(about),
      mobile,
      portfolioLink,
      resumeLink,
      socialMediaLinks: JSON.parse(socialMediaLinks),
      profileImage,
    });
    await newAdmin.save();

    res.status(201).json({
      message: "Admin added successfully",
      admin: newAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while registering you.",
    });
  }
};

const adminLogin = async (req, res) => {
  const { password } = req.body;

  try {
    const admins = await Admin.find();
    if (admins.length === 0)
      return res.status(404).json({
        message: "No admin found. Please register first.",
      });

    const admin = admins[0];

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      return res.status(401).json({
        message: "Wrong Password",
      });

    const tokenKey = process.env.TOKEN_KEY;
    const token = jwt.sign(
      {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        mobile: admin.mobile,
      },
      tokenKey,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "Login Successful",
      user: admin,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
    console.log(error);
  }
};

const guestLogin = async (req, res) => {
  const { name, role } = req.body;

  try {
    const existingUser = await Guest.findOne({ name, role });
    if (existingUser) {
      existingUser.noOfVisits += 1;
      existingUser.lastVisitedAt = new Date();
      await existingUser.save();

      return res.status(200).json({
        message: `Logged in as ${role}`,
        user: existingUser,
      });
    }

    const newUser = new Guest({
      name: name,
      role: role,
    });
    await newUser.save();

    res.status(201).json({
      message: `Logged in as ${role}`,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occurred while logging you in.",
      error: error.message,
    });
  }
};

export { adminRegister, adminLogin, guestLogin };
