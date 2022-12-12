const mongoose =require("mongoose");

const schema=mongoose.Schema({
    taskname:String,
    status:String,
    tag:String,
    userid:String
})

const Task=mongoose.model("task",schema)

module.exports={
    Task
}