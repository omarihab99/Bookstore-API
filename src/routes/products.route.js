const {
  getAllProductsController,
  addProductController,
  deleteProductController,
  updateProductController,
  getFeaturedProductsController,
  getProductController,
} = require("../controllers/products.controller");
const express = require("express");
const router = express.Router();
const {
  subAdminAuth,
} = require("../middlewares/admins.middleware");
router.get("/", getAllProductsController);
router.post("/", subAdminAuth, addProductController);
router.delete("/:name", subAdminAuth, deleteProductController);
router.patch("/:name", subAdminAuth, updateProductController);
router.get("/featured", getFeaturedProductsController);
router.get("/:name", getProductController);
module.exports = router;
