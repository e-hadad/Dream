const express = require('express');
const router = express.Router();
const controllerUser = require('../controller/user')


router.get('/getCartById/:id',controllerUser.getCartById)
router.post("/login", controllerUser.login);
router.delete("/deleteProductFromCart/:userId/:productId",controllerUser.deleteProductFromCart)
router.post("/addProductToCart/:id", controllerUser.addProductToCart);
router.post("/del1ProductToCart/:id", controllerUser.del1ProductToCart);
router.delete("/deleteCartUser/:id",controllerUser.deleteCartUser)
router.get("/", controllerUser.get);
router.post("/", controllerUser.post);
module.exports = router;