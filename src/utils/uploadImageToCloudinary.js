import axios from "axios";

export const uploadProfileImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  const img_res = await axios.post(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    formData,
  );
  return img_res.data.secure_url;
};

export default uploadProfileImage;
