const express=require("express");
const auth=express.Router();
const {jwt}=require("jsonwebtoken")

auth.post("/",(req,res)=>{
    // console.log(req.body)
    const usertoken=req.headers.authorization?.split(" ")[1];
    // jwt.verify(usertoken, 'masaischool', function(err, decoded) {
    //     console.log(err) // bar
    //   });
    console.log(jwt)
    res.send("this is from the auth")
})


module.exports={
    auth
}