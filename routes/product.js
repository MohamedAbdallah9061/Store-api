const express=require("express");

const router=express.Router();

const {getAllStaticProducts,getAllProducts}=require('../controllers/Products');


router.route('/static').get(getAllStaticProducts);

router.route('/').get(getAllProducts);


module.exports=router;