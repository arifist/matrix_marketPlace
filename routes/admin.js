const express = require("express"); 
const router= express.Router();
const adminController=require("../controller/admin");
const isAuth=require("../middleware/isAuth")

router.get("/productController",isAuth,adminController.productController);

router.get("/productAdd",isAuth,adminController.productAdd);

router.post("/productAdd",isAuth,adminController.productAddPost);

router.get("/productUpdate/:id",isAuth,adminController.productUpdateGet);

router.post("/productUpdate/:id",isAuth,adminController.productUpdatePost);

router.get("/productDelete/:id",isAuth,adminController.productDeleteGet);

router.post("/productDelete/:id",isAuth,adminController.productDeletePost);

router.get("/signin",adminController.adminSignInGet);

router.post("/signin",adminController.adminSignInPost);

module.exports = router;