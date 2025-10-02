import { v2 as cloudinary } from "cloudinary";

const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "projects-cover-images",
    });
    console.log("Clodinary upload result :", result);
    return result;
  } catch (err) {
    console.error("Error uploading image to Cloudinary", err);
  }
};

const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Clodinary deletion result :", result);
    return result;
  } catch (err) {
    console.error("Error deleting image from Cloudinary:", err);
    throw err;
  }
};

export { uploadImage, deleteImage };
