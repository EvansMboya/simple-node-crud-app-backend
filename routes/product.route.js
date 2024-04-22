const express=require("express");
//passing router from express dependancies
const router = express.Router();
//importing controllers
const {getProducts,getProduct,createProduct, updateProduct,deleteProduct}=require("../controllers/product.controller.js");


router.get("/",getProducts);

router.get("/:id",getProduct);

router.post("/",createProduct);

router.put("/:id",updateProduct);

router.delete("/:id",deleteProduct);

//exporting routes
module.exports=router