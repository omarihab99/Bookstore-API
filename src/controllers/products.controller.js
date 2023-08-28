const {
  getAllProductsService,
  addProductService,
  deleteProductService,
  updateProductService,
  getFeaturedProductsService,
  getProductService
} = require("../services/products.service");

const getAllProductsController = async (req, res) => {
  try {
    const result = await getAllProductsService();
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const addProductController = async (req, res) => {
  try {
    const result = await addProductService(req.body);
    res.status(result.statusCode).json(result.message);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const deleteProductController = async (req, res) => {
  try {
    const result = await deleteProductService(req.params.name);
    res.status(result.statusCode).json(result.message);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateProductController = async (req, res) => {
  try {
    const name = req.params.name;
    const productInfo = req.body;
    const result = await updateProductService(name, productInfo);
    res.status(result.statusCode).json(result.message);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const getFeaturedProductsController = async (req, res) => {
  try {
    const result = await getFeaturedProductsService();
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const getProductController = async (req, res) => {
  try {
    const result = await getProductService(req.params.name);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = {
  getAllProductsController,
  addProductController,
  deleteProductController,
  updateProductController,
  getFeaturedProductsController,
  getProductController
};
