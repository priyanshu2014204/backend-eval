const {Task}=require("../model/task.js");
const express=require("express");
const { application } = require("express");
const route=express.Router()

route.get("/",async(req,res)=>{
    const data=await Task.find()
    res.send(data)
})

route.post("/create",async(req,res)=>{
    const {taskname,status,tag,userid}=req.body;
    console.log(userid)
    await Task.insertMany({taskname,status,tag,userid});
    res.send({
        "msg":"note get added successfully"
    })
})

route.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    await Task.findByIdAndDelete()
    res.send({
        "msg":"task got deleted successfully"
    })
})
module.exports={
  route
}