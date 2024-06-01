const express=require("express");
const adminRouter=require("./routes/admin");
const userRouter=require("./routes/user");
const path=require("path");
const app= express();
const bodyParser = require('body-parser');
const configSession=require("./middleware/config_Session.js");
const cookieParser = require('cookie-parser')
const csurf=require("csurf"); 


//temlate engine setting
app.set('view engine', 'ejs');

app.use("/", (req, res, next) => {

    next();
});



app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(configSession);
app.use(cookieParser());
app.use(csurf()); 


app.use("/admin",adminRouter);
app.use("/user",userRouter);

//deneme
// const csrfProtection = csrf({ cookie: true });
// app.use(csrfProtection);

//error handler
app.use((err,req,res,next)=>{
    console.log(err);
    console.log(err.name);
    console.log(err.message);
    res.send(err.message);});

app.use("*",(req,res,next)=>{ //isteği yukarıdaki middleware'lerin hiç biri karşılamıyorsa
    res.send("İstenilen kaynağa ulaşılamıyor.")
})

    app.listen(3000,()=>{
    console.log("server running");
})