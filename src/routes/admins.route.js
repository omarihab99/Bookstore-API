const express = require("express");
const router = express.Router();
const {
  adminLoginVal,
  adminRegisterVal,
  adminAuth,
  superAdminAuth,
} = require("../middlewares/admins.middleware");
const {
  adminLoginController,
  adminRegisterController,
  getDashboardInfoController,
  getSalesReportController,
} = require("../controllers/admins.controller");
router.post("/login", adminLoginVal, adminLoginController);
router.post("/register", adminRegisterVal, adminRegisterController);
router.get("/", adminAuth, getDashboardInfoController);
router.get("/sales", adminAuth, getSalesReportController);
router.post("/createadmin", superAdminAuth, adminRegisterController);
module.exports = router;
