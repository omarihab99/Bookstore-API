const dotenv = require("dotenv");
const { createHash } = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const Order = require("../models/Order.model");
const Product = require("../models/Product.model");
const hash = (password) => createHash("sha256").update(password).digest("hex");
dotenv.config({ path: "src/.env" });
const userLoginService = async (userInfo) => {
  try {
    const { email, password } = userInfo;
    const user = await User.findOne({ email });
    if (!user) {
      return {
        token: null,
        statusCode: 404,
        message: "User not found",
      };
    }
    if (hash(password) !== user.password) {
      return {
        token: null,
        statusCode: 401,
        message: "Invalid password",
      };
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    return {
      token: token,
      statusCode: 200,
      message: "Login successful",
    };
  } catch (error) {
    return {
      token: null,
      statusCode: 500,
      message: error.message,
    };
  }
};

const userRegisterService = async (userInfo) => {
  try {
    const { name, email, password } = userInfo;
    const user = await User.findOne({ email });
    if (user) {
      return {
        statusCode: 409,
        message: "User already exists",
      };
    }
    await User.create({
      name: name,
      email: email,
      password: hash(password),
      createdAt: new Date(),
    });
    return {
      statusCode: 201,
      message: "User created successfully",
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};
const checkoutService = async (orderData, totalOrderPrice) => {
  try {
    const newOrder = await Promise.all(
      orderData.map(async (item) => {
        const product = await Product.findOneAndUpdate(
          { name: item.name },
          { $inc: { quantity: -item.quantity, sold: +item.quantity } },
          { new: true }
        );
        if (!product) {
          return {
            statusCode: 404,
            message: "Product not found",
          };
        }
        return {
          product: product._id,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
        };
      })
    );
    console.log(newOrder);
    await Order.create({
      createdAt: new Date(),
      products: newOrder,
      total: totalOrderPrice,
    });
    return {
      statusCode: 201,
      message: "Order placed successfully",
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};
module.exports = {
  userLoginService,
  userRegisterService,
  checkoutService,
};
