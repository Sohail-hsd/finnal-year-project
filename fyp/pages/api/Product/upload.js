// import User from '../../../models/User'
import conneectDB from "../../../middleware/Connection";
import { IncomingForm } from "formidable";
import { promises as fs } from "fs";
const formidable = require("formidable");

const mv = require("mv");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  try {
    const filename = await new Promise((resolve, reject) => {
      let fileName;
      const form = formidable({
        multiples: true,
        uploadDir: "./public/Products",
      });

      // Keep extension.
      // form.keepExtensions = true;

      form.on("fileBegin", (formname, file) => {
        // --- Security constrantent needed here on picture type, extensions. 

        file.filepath = `${file.filepath}.${
          file.originalFilename.split(".")[1]
        }`;
        fileName = file.filepath.split("\\").at(-1);
        form.emit("data", { name: "fileBegin", formname, value: file });
      });

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve(fileName);
      });
    });
    console.log(filename);
    return res.status(200).json({ status: true, filename });
  } catch (error) {
    console.error(error);
    return res
      .status(200)
      .json({ status: false, Error: "Ouccer, while uploading file" });
  }
};

export default conneectDB(handler);
