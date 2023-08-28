const express = require("express");
const router = express.Router();
const {
  adminLoginVal,
  adminRegisterVal,
  adminAuth,
  subAdminAuth,
  superAdminAuth,
} = require("../middlewares/admins.middleware");
const {
  adminLoginController,
  adminRegisterController,
  getDashboardInfoController,
  getSalesReportController,
  getAllUsersController,
  getUserController,
  deleteUserController,
} = require("../controllers/admins.controller");
const {
  getAllProductsController,
  addProductController,
  deleteProductController,
  updateProductController,
} = require("../controllers/products.controller");
router.post("/login", adminLoginVal, adminLoginController);
router.post("/register", adminRegisterVal, adminRegisterController);
router.get("/", adminAuth, getDashboardInfoController);
router.get("/viewsales", adminAuth, getSalesReportController);
router.get("/products", adminAuth, getAllProductsController);
router.post("/products", subAdminAuth, addProductController);
router.delete("/products/:name", subAdminAuth, deleteProductController);
router.patch("/products/:name", subAdminAuth, updateProductController);
router.get("/users", subAdminAuth, getAllUsersController);
router.get("/users/:email", subAdminAuth, getUserController);
router.delete("/users/:email", subAdminAuth, deleteUserController);
router.post("/createadmin", superAdminAuth, adminRegisterController);
module.exports = router;
