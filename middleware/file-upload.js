const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.FILE_UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    console.log("Here");
    try {
      const id = uuidv4();
      const filename = `${id}${path.extname(file.originalname)}`;
      cb(null, filename);
    } catch (error) {
      cb(error);
    }
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
