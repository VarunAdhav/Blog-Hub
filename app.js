const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

// let today = new Date();
let data = [
    {"Title":"First Blog" , 
      "Blog":"Hello this is my first blog.."  }
];
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
    let json = {
        "Title": newTitle,
        "Blog":  newBlog
    }
    data.push(json);
    // timeStamps.push(today.toTimeString().slice(0,5));
    // console.log("Time:",date);

    console.log("\nSuccesfully added the: ",json);
    res.redirect("/home");
});

app.get("/write" , (req , res)=>{
    console.log("into /write");
    res.render("write", {title:"Today's Blogszz"});
});

app.get("/home" , (req , res)=>{
    res.render("home" , {title:"Blogszz", data:data});
});

app.get("/blogs/:Title/:blogNo" , (req , res)=>{
    let i =req.params.blogNo;
    let Blog = data[i].Blog;
    let title = req.params.Title;
    console.log(req.params);
    res.render("blogs" , {i:i , title: title, Blog:Blog});
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