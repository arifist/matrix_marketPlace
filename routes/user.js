const express = require("express"); 
const router= express.Router();
const userController=require("../controller/user");
const isAuth=require("../middleware/isAuth")
const csrfToken=require("../middleware/csrf");


router.get("/",userController.homePage);

router.get("/about",userController.about);

router.get("/communication",userController.communication);

router.get("/products",userController.productAll);

router.get("/productDetails/:id",userController.productDetails);

router.get("/signin",csrfToken,userController.signInGet);

router.post("/signin",userController.signInPost);

//  router.get("/signup",userController.signUp);

router.post("/signup",userController.signUp);

router.get("/cart/:id",userController.cart);


module.exports = router;