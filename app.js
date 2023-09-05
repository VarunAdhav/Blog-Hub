const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');
const mongoose = require('mongoose');

const app = express();

app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

mongoose.connect("mongodb+srv://varunDev:Zgw79eOBFOMCzjjj@cluster0.ef3jysx.mongodb.net/Blogs").then(()=>{
        console.log("Connected to MongoDB Atlas");
})

const blogSchema = new mongoose.Schema({
    Title:{
        type: String ,
        maxLength: [20 , "Length Should not exceed the length of 20"] , 
        required: [1 , "Title for a blog is required"]
    },
    Blog:{
        type: String,
        required: [1 , "For a blog the main content is the Blog so it is necessary"],
        minLength: [25 , "A text is considered to be a blog is atleast 25"]
    }
});

let blog = new mongoose.model("blogs" , blogSchema , "blogs");
// let today = new Date();
// let data = [
//     {"Title":"First Blog" , 
//       "Blog":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."  }
// ];
// let blogs = ["My First Blog" , "My First Blog"];
// let timeStamps = ["00:00" , "01:20"];


// let option = {
//     weekday : "long",
//     year : "numeric",
//     month : "long",
//     day : "numeric"
// }

// let opt = {
//     hour : "numeric", 
//     minute : "numeric"
// }

// let date = today.toLocaleDateString("en-IN" , opt);

app.post("/write" , (req , res)=>{
    let newBlog = req.body.blog;
    let newTitle = req.body.title;

    const newData = new blog({
        Title: newTitle,
        Blog: newBlog
    })
    newData.save();
    // timeStamps.push(today.toTimeString().slice(0,5));
    // console.log("Time:",date);

    res.redirect("/home");
});

app.get("/write" , (req , res)=>{
    console.log("into /write");
    res.render("write", {title:"Today's Blogszz"});
});

app.get("/home" , async(req , res)=>{
    const cur = await blog.find();
    console.log(cur);
    res.render("home" , {title:"Blogszz", data:cur});
});

app.get("/home/:_id" , async(req , res)=>{
    var Blog;
    let _id = req.params._id;
    const cur = await blog.findOne({_id:_id});
    res.render("blogs" ,{
        title: cur.Title,
        Blog: cur.Blog
    });
    // console.log(req.params.Title);
});

app.get("/" , (req , res)=>{
    res.redirect("/home");
});
 
app.get("/about" , (req , res)=>{
    res.render("about" , {title: "About"});
});


app.listen(3000 , ()=>{
    console.log("Listening @ port 3000...");
});