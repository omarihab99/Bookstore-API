const {
  adminLoginService,
  adminRegisterService,
  getDashboardInfoService,
  getSalesReportService,
  getAllProductsService,
  addProductService,
  deleteProductService,
  updateProductService,
  getAllUsersService,
  getUserService,
  deleteUserService,
} = require("../services/admins.service");
const adminLoginController = async (req, res) => {
  const { email, password } = req.body;
  const result = await adminLoginService({ email, password });
  if (result.token) {
    res.status(result.statusCode).json({
      token: result.token,
      message: result.message,
    });
  } else {
    res.status(result.statusCode).json({
      message: result.message,
    });
  }
};

const adminRegisterController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await adminRegisterService({ name, email, password, role });
    res.status(result.statusCode).json(result.message);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getDashboardInfoController = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const result = await getDashboardInfoService({ startDate, endDate });
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};


const getSalesReportController = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const result = await getSalesReportService({ startDate, endDate });
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};




const getAllUsersController = async (req, res) => {
  try {
    const result = await getAllUsersService();
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const getUserController = async(req, res)=>{
  try {
    const result = await getUserService(req.params.email);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const deleteUserController = async(req, res)=>{
  try {
    const result = await deleteUserService(req.params.email);
    res.status(result.statusCode).json(result.message);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = {
  adminLoginController,
  adminRegisterController,
  getDashboardInfoController,
  getSalesReportController,
  getAllUsersController,
  getUserController,
  deleteUserController,
};
