const dataAnc = require("../model/data");
const dataAccess = require("../model/dataAccess");
const bodyParser = require('body-parser');

exports.productController = (req, res, next) => {
    res.render("admin/productController", { productArray: dataAccess });

}

exports.productAdd = (req, res, next) => {
    res.render("admin/productAdd");
    console.log("*************")

}

exports.productAddPost = (req, res, next) => {
    console.log(req.body);
    console.log("--------------");
    const { name, price, imageUrl, productDetail } = req.body;

    dataAccess.addProduct({ name, price, imageUrl, productDetail });
    res.redirect("admin/productAdd"); // Ana sayfaya yönlendir
}
// exports.productAddPost = (req, res, next) => {
//     const { name, price, imageUrl, productDetail } = req.body;
//     dataAccess.addProduct(db, { name, price, imageUrl, productDetail }); // Veritabanı bağlantısını iletin
//     res.redirect("/admin/productAdd"); // Ana sayfaya yönlendir
//   };

exports.productUpdate = (req, res, next) => {
    res.render("admin/productUpdate", { productArray: dataAccess, id: req.params.id });
}

exports.productDelete = (req, res, next) => {
    res.render("admin/productDelete", { productArray: dataAccess, id: req.params.id });
}
