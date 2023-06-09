const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const Post = require("./models/Post");

const multer = require("multer");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
// configure Multer to store uploaded files in a folder named 'uploads'
const uploadMiddleware = multer({ dest: "uploads/" });
// WfKrSMlewnwuTRLu mongo atlast pass

// const upload = multer({ storage: storage });
// connecting mongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/myLoginReg", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err.message);
  });
//creating user schema

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: { type: String },
});

//creating a user model

const user = mongoose.model("User", userSchema);

//configuring middleware
// app.use(express.json());
// app.use(cors({credentials:true,origin:'http://localhost:3000'}));

//Handling sign-up
const secret = "mysecretkey";

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //emcripting the password
    //using salt->A salt is a thing in cryptography a salt is randomly generated value that will join with our password, eg if our password is 1234 a salt might get attach to this password making it A1B2C3D4 and now this salt will be sended forward for encrypttion , this makes our encription more secure , NOTE: PASSWORD CAN BE ENCRYPTED WITHOUT SALT BUT SALTED PASSWORD IS JUST MORE SECURE AND HARD TO CRACK
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user
      .findOne({ email: email })
      .then((existingUser) => {
        if (existingUser) {
          return res
            .status(409)
            .json({ message: "User already exists with this email address." });
        }

        // Creating a new user
        const newUser = new user({
          name,
          email,
          password: hashedPassword,
        });

        // Saving the user to the database
        newUser
          .save()
          .then((savedUser) => {
            return res
              .status(201)
              .json({ message: "User created successfully", user: savedUser });
          })
          .catch((err) => {
            console.error(err);
            return res
              .status(500)
              .json({ message: "An error occurred while saving the user." });
          });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({
          message: "An error occurred while checking for existing user.",
        });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/post', upploadMiddleware.single('file'), async(req, res)=>{
              
    // req.json({test:4, fileIs:req.file});
    let newPath = null;   // if we have request file
    if(req.file){
      const {originalname, path} = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length-1];
      newPath=path + '.' + ext;
      fs.renameSync(path, newPath);
    }

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {id, title,summary,content} = req.body;
      const postDoc = await Post.findById(id)
      const isAuthor = JSON.stringify(postDoc.author)===JSON.stringify(info.id);
      // res.json({isAuthor, postDoc, info});
      if(!isAuthor){
        return res.status(400).json("You are not the Author");
        // throw "You are not the Author";
      }
      
      await postDoc.update({title, summary, content, cover:newPath?newPath:postDoc.cover})

       postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
        author:info.id,
      });
      res.json(postDoc);
    });
  
})

app.get("/", (req, res) => {
  res.json("Hello world");
});

//Handle user login

app.post("/login", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //Finding the user with email
    const Ouruser = await user.findOne({ email, username });
    if (!Ouruser) {
      return res.status(400).json({ message: "Invalid" });
    }

    //Comparing pass
    const isMatch = await bcrypt.compare(password, Ouruser.password);
    if (!isMatch) {
      //log in
      res.status(400).json({ message: error.message });
    } else {
      jwt.sign({ username, id: Ouruser._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json("ok");
      });
    }
    res.json({ message: "Login success" });
    // res.status(200).json({ message: "Login success" });
  } catch (error) {
    res.status(400).json({ message: error.message + "catch" });
  }
});

//profile
app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  jwt.verify(token, secret, {}, (err, decoded) => {
    if (err) throw err;
    const { username } = decoded;
    res.json({ username });
  });
});

//logout

//createpost
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
  });

  res.json({ postDoc });
});

//start server
app.listen(5000, () => {
  console.log("Server listening to port 5000");
});