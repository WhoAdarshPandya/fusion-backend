import { Request, RequestHandler, Response } from "express";
import expressFileUpload, { UploadedFile } from "express-fileupload";
import fs from "fs";
import { uploadImage } from "../utils";

export const imageUploadController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (req.files === null || req.files === undefined) {
    return res.status(200).json({ msg: "no image provided", success: false });
  }
  const file = req.files!.ProfileImage as UploadedFile;
  const ImageUrl = `IMG_${Date.now()}_${file.name}`;
  file.mv(`${__dirname}/src/assets/${ImageUrl}`, async (err) => {
    if (err) {
      return res.status(200).json({ message: "server error", success: false });
    } else {
      await uploadImage(`${__dirname}/src/assets/${ImageUrl}`)
        .then((result) => {
          console.log(result);
          fs.rm(`${__dirname}/src/assets/${ImageUrl}`, (err) => {
            console.log(err);
          });
          return res.json({
            msg: "image uploaded!",
            url: result.secure_url,
            success: true,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.json({ msg: "error occured", success: false, err });
        });
    }
  });
};
