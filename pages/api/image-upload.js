import { uploads } from "../../utils/cloudinary.js";
import fs from "fs";

export default async function handler(req, res) {

  try {
      if (req.files.length > 0) {
    const uploader = async (path) => await uploads(path, "avatars");

    const file = req.files[0];
    const { path } = file;

    const avatarResponse = await uploader(path);
    fs.unlinkSync(path);
  
    res.status(200).json(avatarResponse);
  }
  } catch (error) {
    res.status(200).json('Failed To Upload To Cloudinary');
  }




  res.status(200).json('Failed To Upload To Cloudinary');
}