const express = require("express"); 
const router= express.Router();
const adminController=require("../controller/admin");
const isAuth=require("../middleware/isAuth")
const csrfToken=require("../middleware/csrf");

router.get("/productController",isAuth,adminController.productController);

router.get("/productDetails/:id",isAuth,adminController.productDetailsAdmin);

router.get("/productAdd",isAuth,csrfToken,adminController.productAdd);

router.post("/productAdd",isAuth,adminController.productAddPost);

router.get("/productUpdate/:id",isAuth,csrfToken,adminController.productUpdateGet);

router.post("/productUpdate/:id",isAuth,adminController.productUpdatePost);

router.get("/productDelete/:id",isAuth,csrfToken,adminController.productDeleteGet);

router.post("/productDelete/:id",isAuth,adminController.productDeletePost);

router.get("/signin",csrfToken,adminController.adminSignInGet);

router.post("/signin",adminController.adminSignInPost);

router.get("/list/anc",isAuth,adminController.listAnc);

router.get("/delete/anc/:id",isAuth,adminController.get_deleteAnc)

router.post("/delete/anc",isAuth,adminController.post_deleteAnc);

router.get("/add/anc",isAuth,csrfToken,adminController.get_addAnc);

router.post("/add/anc",isAuth,adminController.post_addAnc);

module.exports = router;