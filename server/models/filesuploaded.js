const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fileSchema = new Schema({
  fileURL: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("filesuploaded", fileSchema);
