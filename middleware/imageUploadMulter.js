const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, "uploads/");
  },
  filename: function (req, file, callBack) {
    const ext = path.extname(file.originalname);
    callBack(null, Date.now() + ext);
  },
});

const imageUpload = multer({
  storage: storage,
  fileFilter: function (req, file, callBack) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      console.log("image uploaded successfully");
      callBack(null, true);
    } else {
      callBack(new Error("Only PNG and JPG files are supported"), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = { imageUpload };
