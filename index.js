const express=require("express");
const adminRouter=require("./routes/admin");
const userRouter=require("./routes/user");
const path=require("path");
const app= express();
const bodyParser = require('body-parser');

//temlate engine setting
app.set('view engine', 'ejs');

app.use((req,res,next) => {
    //loglama yapılabilir
    //res.send("İlk sayfa");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));


app.use("/admin",adminRouter);
app.use("/user",userRouter);

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));

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