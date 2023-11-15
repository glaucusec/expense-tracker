const mongoose = require('mongoose')

const Schema = mongoose.Schema

const fileSchema = new Schema({
    fileURL: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('filesuploaded', fileSchema);