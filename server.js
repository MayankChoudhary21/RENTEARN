const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const flash=require("connect-flash");
const session = require("express-session");
const { name } = require("ejs");
const path=require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Uncomment and configure cookie parser if needed
// const cookieParser = require("cookie-parser");
// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie", (req, res) => {
//     res.cookie("made-in", "India", { signed: true });
//     res.send("Signed cookie sent");
// });

// app.get("/verify", (req, res) => {
//     const cookies = req.signedCookies;
//     console.log(req.signedCookies);
//     res.send({ cookies, message: "verify" }); // Combined response
// });

// app.get("/getcookies", (req, res) => {
//     res.cookie("greet", "hello");
//     res.cookie("made", "India");
//     res.send("Sent you some cookies");
// });

// app.get("/greet", (req, res) => {
//     let { name = "anonymous" } = req.cookies;
//     res.send(`Hi ${name}`);
// });

// Index users
// app.get("/", (req, res) => {
//     console.dir(req.cookies);
//     res.send("Hi I am Root");
// });

app.use("/users", users);
app.use("/posts", posts);

const sessionOptions={
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: true
}
app.use(session(sessionOptions));

app.use(flash());

app.use((req,res,next)=>{
    res.locals.msgs=req.flash("success");
    res.locals.errmsg=req.flash("error");
    next();
});

app.get("/register",(req,res)=>{
    let {name="anomynous"}=req.query;
    req.session.name=name;
    
    if(name ==="anonymous"){
        req.flash("error","user not registered");
    }
    else{
        req.flash("success","user registerted successfully");
    }
    
    res.redirect("/hello");
    // console.log(req.session.name);
    

});

app.get("/hello",(req,res)=>{
    // res.send(`hello ${req.session.name}`);
    // console.log(req.flash("success"));
    // res.locals.msgs=req.flash("success");
    // res.locals.errmsg=req.flash("error");
    res.render("page.ejs",{name :req.session.name});
});
// app.get("/reqcount", (req, res) => {
//     // Initialize count in session if not already defined
//     if (typeof req.session.count === 'undefined') {
//         req.session.count = 0;
//     }

//     // Increment count
//     req.session.count += 1;

//     // Send response with the updated count
//     res.send(`You sent a request ${req.session.count} times`);
// });

// app.get("/test", (req, res) => {
//     res.send("test successful");
// });

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});