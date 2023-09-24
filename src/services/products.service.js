const Product = require("../models/Product.model");
const Category = require("../models/Category.model");
const getAllProductsService = async () => {
  try {
    const products = await Product.find();
    return {
      statusCode: 200,
      data: products,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: error.message,
    };
  }
};
const addProductService = async (productInfo) => {
  try {
    const product = await Product.create({
      ...productInfo
    });
    return {
      statusCode: 201,
      data: product,
    };
  } catch (error) {
    if (error.code === 11000) {
      return {
        statusCode: 409,
        message: "Product already exists",
      };
    }
    if (error.message === "ValidationError") {
      return {
        statusCode: 400,
        message: error.message,
      };
    }
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};
const deleteProductService = async (name) => {
  try {
    const product = await Product.findOneAndDelete({ name });
    if (!product) {
      return {
        statusCode: 404,
        message: "Product not found",
      };
    }
    return {
      statusCode: 200,
      data: product,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: error.message,
    };
  }
};

const updateProductService = async (name, productInfo) => {
  try {
    const product = await Product.findOneAndUpdate({ name }, productInfo, {
      new: true,
    });
    if (!product) {
      return {
        statusCode: 404,
        message: "Product not found",
      };
    }
    return {
      statusCode: 200,
      data: product,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: error.message,
    };
  }
};
const getProductService = async (name) => {
  try {
    const product = await Product.findOne({ name });
    return {
      statusCode: 200,
      data: product,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: error.message,
    };
  }
};
const getFeaturedProductsService = async () => {
  try {
    const products = await Product.find({ featured: true });
    return {
      statusCode: 200,
      data: products,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: error.message,
    };
  }
};
module.exports = {
  getAllProductsService,
  addProductService,
  deleteProductService,
  updateProductService,
  getProductService,
  getFeaturedProductsService
};
