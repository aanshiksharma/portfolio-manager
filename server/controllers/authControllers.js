import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";
import Guest from "../models/Guest.js";

// Add a new admin
// This Route is protected by a password stored in the environment variables
const adminRegister = async (req, res) => {
  const {
    name,
    email,
    password,
    verificationPassword,
    mobile,
    portfolioLink,
    about,
    socialMediaLinks,
  } = req.body;

  const addAdminPassword = process.env.ADD_ADMIN_PASSWORD;
  if (verificationPassword !== addAdminPassword) {
    return res.status(401).json({
      message: "Wrong Password! Cannot add admin.",
    });
  }

  try {
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

    res.status(201).json({
      message: "Admin added successfully",
      admin: newAdmin,
    });
  } catch (error) {
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
    const token = jwt.sign(admin, tokenKey, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const recruiterLogin = async (req, res) => {
  const { name } = req.body;

  try {
    const existingRecruiter = Guest.findOne({ name, role: "recruiter" });
    if (existingRecruiter)
      res.status(200).json({
        message: "Logged in as Recruiter.",
        existingRecruiter,
      });

    const newRecruiter = new Guest({
      name: name,
      role: "recruiter",
    });
    await newRecruiter.save();

    res.status(201).json({
      message: "Logged in as Recruiter.",
      newRecruiter,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occurred while logging you in.",
    });
  }
};

const visitorLogin = async (req, res) => {
  const { name } = req.body;

  try {
    const existingVisitor = Guest.findOne({ name, role: "visitor" });
    if (existingVisitor)
      res.status(200).json({
        message: "Logged in as Visitor.",
        existingVisitor,
      });

    const newVisitor = new Guest({
      name: name,
      role: "visitor",
    });
    await newVisitor.save();

    res.status(201).json({
      message: "Logged in as Visitor.",
      newVisitor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occurred while logging you in.",
    });
  }
};

export { adminRegister, adminLogin, recruiterLogin, visitorLogin };
