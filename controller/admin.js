const dataAnc = require("../model/data");
const dataAccess = require("../model/dataAccess");
const bodyParser = require('body-parser');
const db=require("../model/db");
const path = require('path');
const adminLoginData=require("../model/adminlogindata");
const bcrypt = require('bcrypt');
const productArray=require("../model/dataAccess");

exports.productController = (req, res, next) => {
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
    res.render("admin/productController", { productArray:rows,id:req.params.id});
});
};

exports.productDetailsAdmin=(req,res,next)=>{

    res.render("admin/productDetailsAdmin.ejs",{productArray:productArray,id:req.params.id})
}

exports.productAdd = (req, res, next) => {
    res.render("admin/productAdd");
}

exports.productAddPost = (req, res, next) => {
    if (req.method === 'POST') {
        const { productName, productPrice, imageUrl, productDetail } = req.body;

        // SQL sorgusu ile veriyi ekle
        const sql = `INSERT INTO products (name, price, imageUrl, productDetail) VALUES (?, ?, ?, ?)`;
        const params = [productName, productPrice, imageUrl, productDetail];

        db.run(sql, params, function(err) {
            if (err) {
                console.error(err.message);
                return next(err);
            }
            // Başarılı ekleme işlemi sonrası yönlendirme veya mesaj
            res.redirect('/admin/productController');  // veya başka bir sayfaya yönlendirin
        });
    } else {
        res.render("admin/productAdd");
    }
};


exports.productUpdateGet = (req, res, next) => {
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
        res.render("admin/productUpdate", { productArray: rows,id:req.params.id });
    });
};

exports.productUpdatePost = (req, res, next) => {
    const { id, productName, productPrice, imageUrl, productDetail } = req.body;

    console.log(req.body); // Debugging için POST verilerini yazdırma

    const query = `UPDATE products SET 
                    name = ?, 
                    price = ?, 
                    imageUrl = ?, 
                    productDetail = ? 
                  WHERE id = ?`;

    db.run(query, [productName, productPrice, imageUrl, productDetail, id], function (err) {
        if (err) {
            console.error(err.message);
            return next(err);
        }
        res.redirect("/admin/productController"); // Güncelleme sonrası yönlendirilecek sayfa
    });
};


exports.productDeleteGet = (req, res, next) => {
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
        res.render("admin/productDelete", { productArray: rows,id:req.params.id });
    });
}

exports.productDeletePost = (req, res, next) => {
    const { id } = req.body;

    const sql = `DELETE FROM products WHERE id = ?`;
    const params = [id];

    db.run(sql, params, function(err) {
        if (err) {
            console.error(err.message);
            return next(err);
        }
        // Başarılı silme işlemi sonrası yönlendirme veya mesaj
        res.redirect('/admin/productController');  // veya başka bir sayfaya yönlendirin
    });
};


exports.adminSignInGet=(req,res,next)=>{
    const email=req.cookies.email;
    const password=req.cookies.password;

     res.render("admin/signin",{authInfo:{email:email,password:password}})
    //res.render(path.join(__dirname,"../","views","admin","signina.ejs"));

    
}



exports.adminSignInPost=async(req,res,next)=>{

    const user=adminLoginData.find(x=>x.email==req.body.email);
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
        const url=req.query.url || "/admin/productController"; //req.query.url varsa onu yoksa "/admin/list/anc" url olarak kabul et.
        return res.redirect(url);
    }
    //şifre uyuşmuyorsa
    res.redirect("signin");
    
}

// exports.adminSignInPost=async(req,res,next)=>{

//     const user=adminLoginData.find(x=>x.email==req.body.email);
//     if (user==undefined) {
//         req.session.message={text:"Email hatali",class:"warning"}
//         return res.redirect("signin");
//     }
//     if (await bcrypt.compare(req.body.password,user.password)){ //şifre uyuşuyorsa
//         req.session.isAuth=1;
//         req.session.fullname=user.name;

//         const url=req.query.url || "/admin/productController"; //req.query.url varsa onu yoksa "/admin/list/anc" url olarak kabul et.
//         return res.redirect(url);
//     }
//     //şifre uyuşmuyorsa
//     req.session.message={text:"Şifre hatali",class:"warning"};
//     res.redirect("signin");
    
// }