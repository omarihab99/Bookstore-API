const dotenv = require("dotenv");
const { createHash } = require("crypto");
const Admin = require("../models/Admin.model");
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const Order = require("../models/Order.model");
const jwt = require("jsonwebtoken");
dotenv.config({ path: "src/.env" });
const hash = (password) => createHash("sha256").update(password).digest("hex");
const adminLoginService = async (adminInfo) => {
  try {
    const { email, password } = adminInfo;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return {
        token: null,
        statusCode: 404,
        message: "User not found",
      };
    }
    if (hash(password) !== admin.password) {
      return {
        token: null,
        statusCode: 401,
        message: "Invalid password",
      };
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET);
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

const adminRegisterService = async (adminInfo) => {
  try {
    const { name, email, password, role } = adminInfo;
    const admin = await Admin.findOne({ email });
    if (admin) {
      return {
        statusCode: 409,
        message: "Admin already exists",
      };
    }
    await Admin.create({
      name: name,
      email: email,
      password: hash(password),
      role: role,
    });
    return {
      statusCode: 201,
      message: "Admin created successfully",
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const getDashboardInfoService = async ({ startDate, endDate }) => {
  try {
    const numberOfActiveUsers = await User.countDocuments({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    const numberOfSoldProducts = await Product.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: "$sold",
          },
          totalRevenue: {
            $sum: {
              $multiply: ["$price", "$sold"],
            },
          },
        },
      },
    ]);
    return {
      statusCode: 200,
      data: {
        activeUsers: numberOfActiveUsers,
        soldItems: numberOfSoldProducts[0].count,
        totalRevenue: numberOfSoldProducts[0].totalRevenue,
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: error.message,
    };
  }
};


const getSalesReportService = async ({ startDate, endDate }) => {
  try {
    const sales = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $unwind: "$products"
      },
      {
        $group: {
          _id: {
            date: "$createdAt",
          },
          totalQuantitySold: { $sum: "$products.quantity" },
          totalPrice: { $sum: "$products.totalPrice" }
        }
      },
    ]);
    console.log(sales)
    return {
      statusCode: 200,
      data: sales,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: error.message,
    };
  }
};





module.exports = {
  adminLoginService,
  adminRegisterService,
  getDashboardInfoService,
  getSalesReportService,

};
