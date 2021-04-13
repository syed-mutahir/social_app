const mongo = require("mongoose");
const Schema = mongo.Schema;

const myImagesSchema = Schema({

    authorEmail:String,
    imageURL:String
});

module.exports = mongo.model('ImagesData',myImagesSchema);