const express = require("express");
const app = express();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors=require("cors")
let {route}=require("./dbm test/route.js")
const { connection } = require("./config/db.js");
// const {Task}=require("./model/task.js")
let { Persondata } = require("./model/user.js");
app.use(express.json());
app.use(cors({
    origin:"*"
}))
app.post("/signup", async (req, res) => {
  const { email, password, ip, name } = req.body;
  bcrypt.hash(password, 4, async function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      console.log(err);
      res.send("something went wrong please try again");
    } else {
      const ip = req.socket.remoteAddress;
      await Persondata.insertMany({ email, password: hash, ip });
      res.send("user signed up successfully");
    }
  });
});

app.get("/",async(req,res)=>{
    let data=await Persondata.find();
    res.send(data)
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const obj = await Persondata.findOne({ email });
  const hash = obj.password;
  const id=obj._id
//   console.log(id)
  //    const user=await Persondata.findOne({password});
  console.log(password, hash);
  bcrypt.compare(password, hash, function (err, result) {
    // result == true
    //     var jwt = require('jsonwebtoken');
      if(result){
        var token = jwt.sign({ foo: id }, "masaischool");
        res.send({ "token": token });
      }else{
        res.send({
            "err":"something went wrong"
          })
      }
  })
  
});

app.use((req,res,next)=>{
    const usertoken=req.headers.authorization?.split(" ")[1];

    console.log(usertoken)
       jwt.verify(usertoken, 'masaischool', function(err, decoded) {
        if(decoded){
            req.body.userid=decoded.foo
            next()
            
        }else{
            res.send({
                "msg":"not recognized"
            })
        }
      });
    
    // res.send("this is from the auth")
})


app.use("/todos",route)

app.listen(8080, async () => {
  connection
  try {
    console.log("Port got connected successfully");
  } catch (err) {
    console.log(err);
  }
});
