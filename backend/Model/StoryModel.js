const mongo = require("mongoose");
const Schema = mongo.Schema;

const myStorySchema = Schema({

    authorName:String,
    authorEmail:String,
    storyTitle:String,
    storyDescription:String,
    storyComments:Array,
    imageURL:String
});

module.exports = mongo.model('StoryData',myStorySchema);