const mongoose =require("mongoose");

const schema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    ip:String
})

const Persondata=mongoose.model("person",schema)

module.exports={
    Persondata
}