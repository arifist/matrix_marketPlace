const express = require("express"); 
const router= express.Router();
const adminController=require("../controller/admin");

router.get("/productController",adminController.productController);

router.get("/productAdd",adminController.productAdd);

// router.post("/productAdd",adminController.productAdd);

router.post("/productAdd",adminController.productAddPost);

router.get("/productUpdate/:id",adminController.productUpdate);

router.get("/productDelete/:id",adminController.productDelete);


module.exports = router;