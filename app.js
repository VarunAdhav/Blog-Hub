const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let today = new Date();

let blogs = {};

let option = {
    weekday : "long",
    year : "numeric",
    month : "long",
    day : "numeric"
}

let date = today.toLocaleDateString("en-IN" , option);

app.post("/write" , (req , res)=>{
    let newBlog = req.body.blog;
    console.log(newBlog);
    res.redirect("/");
});

app.get("/write" , (req , res)=>{
    console.log("into /write");
    res.render("write", {title:"Today's Blogszz" , date:date});
});

app.get("/" , (req , res)=>{
    res.render("home" , {title:"Blogszz",date:date});
});

app.listen(3000 , ()=>{
    console.log("Listening @ port 3000...");
});