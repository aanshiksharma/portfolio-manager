import AdminConfig from "../models/AdminConfig.js";

const getAdminConfig = async (req, res) => {
  res.json({
    siteTitle: "My Portfolio",
    adminEmail: "admin@example.com",
  });
};

const editAdminConfig = async (req, res) => {
  res.json({ message: "Update admin route is working!" });
};

export { getAdminConfig, editAdminConfig };
