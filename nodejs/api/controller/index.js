const fileImg = require("../model/index");
const Domain = "http://localhost:3001/";

exports.getFile = async (req, res) => {
  let page = +req.query.page;
  let limit = +req.query.limit;
  let filename = req.query.filename ? req.query.filename : "";

  let skip = (page - 1) * limit;
  try {
    let listImg = await fileImg
      .find({
        fileName: { $regex: filename, $options: "i" },
      })
      .skip(skip)
      .limit(limit);
    let totalPage = 0;
    if (filename === "") {
      let count = await fileImg.countDocuments();
      totalPage = Math.ceil(count / limit);
    } else {
      let count = await fileImg.find({
        fileName: { $regex: filename, $options: "i" },
      });
      totalPage = Math.ceil(count.length / limit);
    }
    res.json({ listImg, totalPage });
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

exports.getOneFile = async (req, res) => {
  let id = req.params.id;
  let listImg = [];
  try {
    let result = await fileImg.findById(id);
    let totalPage = 1;
    listImg.push(result);
    res.json({ listImg, totalPage });
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

exports.postFile = async (req, res) => {
  try {
    let result;
    for (let i = 0; i < req.files.length; i++) {
      let url = Domain + req.files[i].originalname.split(" ").join("-");
      let fileName = req.files[i].originalname;
      let newImg = new fileImg({
        url: url,
        fileName: fileName,
      });
      result = await newImg.save();
    }
    res.json({ result });
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

exports.deleteFile = async (req, res) => {
  let id = req.params.id;
  try {
    await fileImg.findByIdAndDelete(id);
    res.json({ message: "delete success" });
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

exports.putFile = async (req, res) => {
  let id = req.params.id;
  try {
    let url = Domain + req.files[0].originalname.split(" ").join("-");
    let fileName = req.body.text;
    await fileImg.findByIdAndUpdate(id, { url, fileName });
    res.json({ message: "update success" });
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};
