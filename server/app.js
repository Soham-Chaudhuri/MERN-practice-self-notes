const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("./models/user");
const postsModel = require("./models/posts");
const cookieParser = require("cookie-parser");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/create", async (req, res) => {
  let { username, email, password,  } = req.body;
  let user = await userModel.findOne({ email });
  if (user)
    return res.send({ message: "email already exists", proceed: false });
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      let createdUser = await userModel.create({
        username,
        email,
        password: hash,
        
      });
      let token = jwt.sign({ email, username }, "shhhhhhh");
      // res.cookie("token",token);
      // console.log(createdUser);
      res.send({ message: token, proceed: true });
    });
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user)
    return res.send({ message: "something went wrong", proceed: false });
  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ email, username: user.username }, "shhhhhhh");
      res.send({ message: token, proceed: true });
    } else {
      res.send({ message: "something went wrong", proceed: false });
    }
  });
});

app.post("/posts", async (req,res)=>{
    let allPosts = await postsModel.find();
    res.send({allPosts});
});


app.post("/newPost", async (req,res)=>{
    let {title, imageURL,token} =req.body;
    let {username,email} = jwt.verify(token,"shhhhhhh");
    let createdPost = await postsModel.create({
        title,imageURL,username,email
    });
    res.send({ message: "ok vai", proceed: true });
});


app.listen(5000);
