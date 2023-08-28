const express = require("express");
const router = express.Router();
const {
  getFeaturedProductsController,
  getAllProductsController,
  getProductController,
} = require("../controllers/products.controller");
const {
    userLoginController,
    userRegisterController,
    checkoutController
} = require("../controllers/users.controller");
const {
  userLoginVal,
  userRegisterVal,
  verifyToken,
} = require("../middlewares/users.middleware");
router.post("/login", userLoginVal, userLoginController);
router.post("/register", userRegisterVal, userRegisterController);
router.get("/", getFeaturedProductsController);
router.get("/products/:name", getProductController);
router.get("/products", getAllProductsController);
router.post('/checkout', verifyToken, checkoutController);
module.exports = router;
