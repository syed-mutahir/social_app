var express = require("express");
var mongo = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");

var myStorySchema = require("./Model/StoryModel");
var {url} = require("./Config/Key");

mongo.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})

var app = express();

app.use(cors());

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.post('/create',(req,res)=>{
    var storyData = new myStorySchema({
        authorName:req.body.authorName,
        authorEmail:req.body.authorEmail,
        storyTitle:req.body.storyTitle,
        storyDescription:req.body.storyDiscription,
        storyComments:req.body.storyComments
    });
    storyData.save().then(myStoryData=>{
        res.send(myStoryData);
    })
});

app.get('/getstorydata',(req,res)=>{
        myStorySchema.find({}).then(data=>{
            res.send({storyData:data});
        })
});

app.put('/addcomment',(req,res)=>{
    var data=myStorySchema.findByIdAndUpdate(req.body.Id,{
        "$push":{storyComments:req.body.StoryComment}
    },{new:true});
    data.then(newData=>{
        res.send(newData);
    })
    
})

app.delete('/deletestory',(req,res)=>{
    var newData = myStorySchema.findByIdAndDelete(req.body.Id);
    newData.then(data=>{res.send(data)});
})
app.put('/deletecomment',(req,res)=>{
    var newArr;
    var story = myStorySchema.findOne({_id:req.body.storyId});
    story.then(obj =>{
        newArr=obj.storyComments.filter(value=>{
            return obj.storyComments[req.body.commentIndex]!==value
        });
        
    })
    setTimeout(() => {
            console.log(newArr)
            myStorySchema.findByIdAndUpdate(req.body.storyId,{storyComments:newArr},{new:true})
            .then(newStory => {
                res.send(newStory);
            })
        
    }, 1000);
})

app.put('/updatestory',(req,res)=>{

          myStorySchema.findByIdAndUpdate(req.body.Id,{storyTitle:req.body.storyTitle,storyDescription:req.body.storyDescription},{new:true})
            .then(updatedStory => {
               res.send(updatedStory);
            })
})


app.listen(5000,()=>{console.log("App is running on port 8000")});