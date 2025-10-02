import { v2 as cloudinary } from "cloudinary";

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

export { deleteImage };
