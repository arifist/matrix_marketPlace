const path = require('path');
const express=require("express");
// const productArray=require("../model/data");
const productArray=require("../model/dataAccess");
const userArray=require("../model/data");
const db=require("../model/db");
const loginData=require("../model/logindata");
const bcrypt = require('bcrypt');

exports.homePage=(req,res,next)=>{
    // res.render(path.join(__dirname,"../","views","user","home-page.ejs"));
    res.render("user/home-page.ejs",{productArray:productArray})
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

    res.render("user/signIn",{userArray:userArray,authInfo:{email:email,password:password}})
}

// exports.signInPost=async(req,res,next)=>{

//     const user=loginData.find(x=>x.email==req.body.email);
//     if (user==undefined) {
//         req.session.message={text:"Email hatali",class:"warning"}
//         return res.redirect("signin");
//     }
//     if (await bcrypt.compare(req.body.password,user.password)){ //şifre uyuşuyorsa
//         req.session.isAuth=1;
//         req.session.fullname=user.name;

//         const url=req.query.url || "/user/"; //req.query.url varsa onu yoksa "/admin/list/anc" url olarak kabul et.
//         console.log(url);
//         return res.redirect(url);
//     }
//     //şifre uyuşmuyorsa
//     req.session.message={text:"Şifre hatali",class:"warning"};
//     res.redirect("signin");
    
// }

exports.signInPost=async(req,res,next)=>{

    const user=loginData.find(x=>x.email==req.body.email);
    if (user==undefined) {
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
    res.redirect("signin");
    
}

exports.signUp=(req,res,next)=>{

    res.render(path.join(__dirname,"../","views","user","signUp.ejs"));
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




