const express = require("express"); 
const router= express.Router();
const adminController=require("../controller/admin");

router.get("/productController",adminController.productController);

router.get("/productAdd",adminController.productAdd);

router.post("/productAdd",adminController.productAddPost);

router.get("/productUpdate/:id",adminController.productUpdateGet);

router.post("/productUpdate/:id",adminController.productUpdatePost);

router.get("/productDelete/:id",adminController.productDeleteGet);

router.post("/productDelete/:id",adminController.productDeletePost);


module.exports = router;