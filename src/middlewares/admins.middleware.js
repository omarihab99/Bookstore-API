const joi = require("joi");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "src/.env" });
const JWT_SECRET = process.env.JWT_SECRET;
const adminLoginVal = (req, res, next) => {
  try {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi
        .string()
        .min(8)
        .required()
        .pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
        )
        .messages({
          "string.pattern.base":
            "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one digit, and one special character.",
          "string.min": "Password must be at least 8 characters long",
          "string.empty": "Password is required",
        }),
    });
    const { error } = schema.validate(req.body);
    if (error) throw error;
    next();
  } catch (error) {
    if (typeof error === joi.ValidationError) {
      const errorMessage = error.details.map((err) => err.message).join(", ");
      res.status(400).json(errorMessage);
    }
    res.status(500).json(error.message);
  }
};

const adminRegisterVal = (req, res, next) => {
  try {
    const schema = joi.object({
      name: joi.string().required().min(3),
      email: joi.string().email().required(),
      password: joi
        .string()
        .min(8)
        .required()
        .pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
        )
        .messages({
          "string.pattern.base":
            "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one digit, and one special character.",
          "string.min": "Password must be at least 8 characters long",
          "string.empty": "Password is required",
        }),
      passwordConfirmation: joi
        .string()
        .required()
        .valid(joi.ref("password"))
        .messages({
          "any.only": "Password confirmation does not match Password",
        }),
        role: joi.string().required().valid('admin', 'subadmin', 'superadmin'),
    });
    const { error } = schema.validate(req.body);
    if (error) throw error;
    next();
  } catch (error) {
    if (typeof error === joi.ValidationError) {
      const errorMessage = error.details.map((err) => err.message).join(", ");
      res.status(400).json(errorMessage);
    }
    res.status(500).json(error.message);
  }
};

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) {
      throw new Error("No token provided");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json(error.message);
  }
};

const subAdminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) {
      throw new Error("No token provided");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role === "subadmin" || decoded.role === "superadmin") {
      req.user = decoded;
      next();
      return;
    }
    throw new Error("Unauthorized");
    
  } catch (error) {
    res.status(401).json(error.message);
  }
};
const superAdminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) {
      throw new Error("No token provided");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "superadmin") {
      throw new Error("Unauthorized");
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json(error.message);
  }
};
module.exports = {
  adminLoginVal,
  adminRegisterVal,
  adminAuth,
  subAdminAuth,
  superAdminAuth,
};
