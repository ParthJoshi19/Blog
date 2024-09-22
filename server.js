import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { User } from './DataBase/db.js';

const app = express();
const Port = 8000;

// MongoDB connection
const mongoURI = "mongodb+srv://parthjoshi1973:Parth%401947@cluster0.edytu.mongodb.net/mydatabase";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ msg: "Hello From Backend" });
});

app.put("/editBlog",async(req,res)=>{
  const {email,blog}=req.body;
  const UserInfo=await User.findOne({email:email});
  UserInfo.blogs=blog;
  UserInfo.save();
  // console.log(email,blog);
})

app.get("/getBlog/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const blog = await User.findOne({id:id});
    res.json(blog);
  } catch (error) {
    res.status(500).send("Error fetching blog.");
  }
});


app.put("/getBlogs",async(req,res)=>{
  const data=await User.find();
  const allBlogs=[];
  for(let i=0;i<data.length;i++){
    for(let j=0;j<data[i].blogs.length;j++){
      if(data[i].blogs[j]){
        // console.log(data[i].blogs[j]);
        allBlogs.push(data[i].blogs[j]);
      }
    }
  }
  res.status(201).json({allBlogs:allBlogs});
  // console.log(allBlogs);
})

app.put("/getData", async (req, res) => {
  const { email } = req.body;
  // console.log(email);
  try {
    const UserInfo = await User.findOne({ email });
    // console.log(UserInfo);
    res.status(201).json({ Obj: UserInfo });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

app.put("/delete",async(req,res)=>{
  const {blog,email}=req.body;
  // console.log(blog);
  const UserInfo=await User.findOne({email:email});
  UserInfo.blogs=blog;
  await UserInfo.save();
  // console.log(UserInfo);
  // console.log(UserInfo);
})


app.put("/login",async(req,res)=>{
  const {email,password}=req.body;
  // console.log(email,password);
  try {
    
    const UserInfo=await User.findOne({email:email})
    if(UserInfo && UserInfo.email===email && UserInfo.password===password){
      res.status(201).json({ message: 'Login Successful' ,Obj:UserInfo});
    }
    else{
      res.status(202).json({msg:'Login or password is incorrect/Register first'})
      // throw new Error("Login Not Found");
      // console.log("Register first")
    }
    // await newUser.save();
  } catch (error) {
    console.error('Login or password is incorrect/Register first', error);
    res.status(400).json({ error: 'Login or password is incorrect/Register first' });
  }

}); 


app.post('/Addnew', async (req, res) => {
  const { email, title, author,description,date ,id } = req.body;
  try {
    const user = await User.findOne({ email });
    user.blogs.push({ title, description, author,date,id });
    await user.save();
    res.status(201).json({ Obj: user });
  } catch (error) {
    res.status(400).json({ error: 'Error adding new blog' });
  }
});

app.post('/register', async (req, res) => {
  const { name, email, password,blogs } = req.body;
  // console.log('Received data:', { name, email, password,blogs });
  
  try {
    const newUser = new User({
      name,
      email,
      password,
      blogs,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ error: 'User registration failed' });
  }
});

app.listen(Port, () => {
  console.log(`Server running at port ${Port}`);
});
