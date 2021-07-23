const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let url = path.join(__dirname, "../", "../", "public");
    callback(null, url);
  },
  filename: (req, file, callback) => {
    let filename = file.originalname.split(" ").join("-");
    callback(null, filename);
  },
});
module.exports = multer({ storage: storage });
