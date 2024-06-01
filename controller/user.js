const path = require('path');
const express=require("express");
// const productArray=require("../model/data");
const productArray=require("../model/dataAccess");
const userArray=require("../model/data");
const db=require("../model/db");
const loginData=require("../model/logindata");
const bcrypt = require('bcrypt');
const fs = require('fs');

let homePageVisits = 0;

// Dosyadan ziyaretçi sayısını oku
fs.readFile('visitorCount.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    homePageVisits = parseInt(data) || 0;
    console.log("Initial visitor count:", homePageVisits);
});

exports.homePage = (req, res, next) => {
    homePageVisits++;
    console.log("Total visitors:", homePageVisits);

    // Dosyaya ziyaretçi sayısını yaz
    fs.writeFile('visitorCount.txt', homePageVisits.toString(), (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        }
        console.log("Visitor count saved to file.");
    });

    res.render("user/home-page.ejs", { productArray: productArray, homePageVisits: homePageVisits });
}

exports.about=(req,res,next)=>{
    // res.send(" id'li duyuru gösteriliyor");
    res.render(path.join(__dirname,"../","views","user","about.ejs"));

}

exports.communication=(req,res,next)=>{
    // res.send(" id'li duyuru gösteriliyor");
res.render(path.join(__dirname,"../","views","user","communication.ejs"));

}

// exports.productAll=(req,res,next)=>{
//     res.render("user/products",{productArray:db})
// }


exports.productAll = (req, res, next) => {
    db.all(`SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.price AS product_price,
    p.imageUrl AS product_imageUrl,
    p.productDetail AS product_productDetail,
    GROUP_CONCAT(c.id) AS comment_ids,
    GROUP_CONCAT(c.text) AS comment_texts
    FROM 
        products p
    LEFT JOIN 
        comments c ON p.id = c.productId
    GROUP BY
    p.id;`, (err, rows) => {
        if (err) {
            console.error(err.message);
            return next(err);
        }
        res.render("user/products", { productArray: rows });
    });
};


exports.productDetails=(req,res,next)=>{

    res.render("user/productDetails",{productArray:productArray,id:req.params.id})
}

exports.signInGet=(req,res,next)=>{
    const email=req.cookies.email;
    const password=req.cookies.password;
    const message=req.session.message;    

    res.render("user/signIn",{
        userArray:userArray,
        message:message,
        authInfo:{email:email,password:password},
        csrfToken:req.csrfToken()

    });
}

exports.signInPost=async(req,res,next)=>{

    const user=loginData.find(x=>x.email==req.body.email);
    if (user==undefined) {
        req.session.message={text:"Email hatali",class:"warning"}
        return res.redirect("signin");
    }
    if (await bcrypt.compare(req.body.password,user.password)){ //şifre uyuşuyorsa
        req.session.isAuth=1;
        req.session.fullname=user.name;

        const url=req.query.url || "/user/"; //req.query.url varsa onu yoksa "/admin/list/anc" url olarak kabul et.
        console.log(url);
        return res.redirect(url);
    }
    //şifre uyuşmuyorsa
    req.session.message={text:"Şifre hatali",class:"warning"};
    res.redirect("signin");
    
}

exports.signInPost=async(req,res,next)=>{

    const user=loginData.find(x=>x.email==req.body.email);
    if (user==undefined) {
        req.session.message={text:"Email hatalı",class:"warning"}
        return res.redirect("signin");
    }

    if (await bcrypt.compare(req.body.password,user.password)){ //şifre uyuşuyorsa
        req.session.isAuth=1;
        req.session.fullname=user.name;

        if (req.body.cbhatirla=="1"){ 
            res.cookie("email",req.body.email);
            res.cookie("password",req.body.password);
        }
        else{
            res.clearCookie("email");
            res.clearCookie("password"); 
        }
        const url=req.query.url || "/user/"; //req.query.url varsa onu yoksa "/admin/list/anc" url olarak kabul et.
        return res.redirect(url);
    }
    //şifre uyuşmuyorsa
    req.session.message={text:"Şifre hatalı",class:"warning"};
    res.redirect("signin");
    
}



exports.signUp=(req,res,next)=>{

    res.render(path.join(__dirname,"../","views","user","signUp.ejs"));
}

exports.signout=async(req,res)=>{
    await req.session.destroy(); //session temizle
    res.redirect("/user/signin"); //ana sayfaya git
}

exports.cart=(req,res,next)=>{

    res.render("user/cart",{productArray:productArray,id:req.params.id})
}

exports.cartHome=(req,res,next)=>{
    db.all(`SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.price AS product_price,
    p.imageUrl AS product_imageUrl,
    p.productDetail AS product_productDetail,
    GROUP_CONCAT(c.id) AS comment_ids,
    GROUP_CONCAT(c.text) AS comment_texts
    FROM 
        products p
    LEFT JOIN 
        comments c ON p.id = c.productId
    GROUP BY
    p.id;`, (err, rows) => {
        if (err) {
            console.error(err.message);
            return next(err);
        }
        res.render("user/cart", { productArray: rows });
    });
}




