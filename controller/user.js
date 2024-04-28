const path = require('path');
const express=require("express");
// const productArray=require("../model/data");
const productArray=require("../model/dataAccess");
const userArray=require("../model/data");

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
exports.productAll=(req,res,next)=>{
    res.render("user/products",{productArray:productArray})
}


exports.productDetails=(req,res,next)=>{

    res.render("user/productDetails",{productArray:productArray,id:req.params.id})
}

exports.signIn=(req,res,next)=>{

    res.render("user/signIn",{userArray:userArray})
    
}



exports.signUp=(req,res,next)=>{

    res.render(path.join(__dirname,"../","views","user","signUp.ejs"));
}


exports.cart=(req,res,next)=>{

    res.render("user/cart",{productArray:productArray,id:req.params.id})
}





