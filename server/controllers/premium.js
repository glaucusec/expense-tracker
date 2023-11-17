const User = require("../models/user");
const FilesUploaded = require("../models/filesuploaded");

require("dotenv").config();

const UserServices = require("../services/userservices");
const S3Services = require("../services/s3services");

exports.downloadReport = async (req, res, next) => {
  try {
    const expenses = await UserServices.getExpenses(req.session._id);
    const stringifiedExpenses = JSON.stringify(expenses);

    const userId = req.session._id;
    const fileName = `expense${userId}/${new Date()}.txt`;

    const fileURL = await S3Services.uploadToS3(stringifiedExpenses, fileName);
    FilesUploaded.create({ fileURL: fileURL, userId: userId });
    res.status(200).json({ fileURL: fileURL, success: true });
  } catch (err) {
    console.log(err);
    res.status(200).json({ fileURL: "", success: false, message: err });
  }
};

exports.fileUrls = async (req, res, next) => {
  try {
    const userId = req.session._id;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    const length = await FilesUploaded.countDocuments({
      userId: userId,
    });

    if (endIndex < length) {
      results.next = page + 1;
    }

    if (startIndex > 0) {
      results.previous = page - 1;
    }

    results.results = await FilesUploaded.find({ userId: userId })
      .select("fileURL")
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex);

    results.current = page;
    return res.status(200).json(results);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

exports.leaderBoard = async (req, res, next) => {
  try {
    User.find()
      .select("name totalAmount _id")
      .limit(3)
      .sort({ totalAmount: "desc" })
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
