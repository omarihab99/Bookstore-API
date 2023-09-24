const express = require("express");
const router = express.Router();

const {
    userLoginController,
    userRegisterController,
    checkoutController,
    getAllUsersController,
    getUserController,
    deleteUserController
} = require("../controllers/users.controller");
const {
  userLoginVal,
  userRegisterVal,
  verifyToken,
} = require("../middlewares/users.middleware");
const { subAdminAuth } = require("../middlewares/admins.middleware");
router.post("/login", userLoginVal, userLoginController);
router.post("/register", userRegisterVal, userRegisterController);
router.post('/checkout', verifyToken, checkoutController);
router.get("/", subAdminAuth, getAllUsersController);
router.get("/:email", subAdminAuth, getUserController);
router.delete("/:email", subAdminAuth, deleteUserController);
module.exports = router;
