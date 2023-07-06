const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let today = new Date();

let blogs = ["My First Blog" , "My First Blog"];
let timeStamps = ["00:00" , "01:20"];

let option = {
    weekday : "long",
    year : "numeric",
    month : "long",
    day : "numeric"
}

let opt = {
    hour : "numeric",
    minute : "numeric"
}

let date = today.toLocaleDateString("en-IN" , opt);

app.post("/write" , (req , res)=>{
    let newBlog = req.body.blog;
    blogs.push(newBlog);
    timeStamps.push(today.toTimeString().slice(0,5));
    console.log("Time:",date);
    console.log("\nSuccesfully added the: ",newBlog);
    res.redirect("/");
});

app.get("/write" , (req , res)=>{
    console.log("into /write");
    res.render("write", {title:"Today's Blogszz" , date:date});
});

app.get("/" , (req , res)=>{
    res.render("home" , {title:"Blogszz",date:date , blogs:blogs , timeStamps:timeStamps});
});

app.get("/about" , (req , res)=>{
    res.render("about" , {title: "About"});
});

app.listen(3000 , ()=>{
    console.log("Listening @ port 3000...");
});