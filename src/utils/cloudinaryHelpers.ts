import cloudinary, { UploadApiResponse } from "cloudinary";
import { config } from "dotenv";
import { v4 } from "uuid";

config();

export const initCloudinary = (): void => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export const uploadImage = async (
  imageUrl: string
): Promise<UploadApiResponse> => {
  const res: UploadApiResponse = await cloudinary.v2.uploader.upload(
    imageUrl,
    {
      resource_type: "image",
      public_id: `profile-${v4()}`,
      overwrite: true,
      folder: "profiles",
    },
    (err, res) => {
      if (err) {
        console.log(err);
        return { success: false, imageUrl: "" };
      } else {
        console.log(res?.url);
        console.log(res?.secure_url);
        return { success: false, imageUrl: res?.secure_url };
      }
    }
  );
  return res;
};
