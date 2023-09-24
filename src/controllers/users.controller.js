const {
  userLoginService,
  userRegisterService,
  checkoutService,
  getAllUsersService,
  getUserService,
  deleteUserService
} = require("../services/users.service");
const userLoginController = async (req, res) => {
  const { email, password } = req.body;
  const result = await userLoginService({ email, password });
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

const userRegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await userRegisterService({ name, email, password });
    res.status(result.statusCode).json(result.message);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const checkoutController = async (req, res) => {
    try{
        const {orderData, totalOrderPrice} = req.body;
        const result = await checkoutService(orderData, totalOrderPrice);
        res.status(result.statusCode).json(result.message);
    }
    catch(error){
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
  userLoginController,
  userRegisterController,
  checkoutController,
  getAllUsersController,
  getUserController,
  deleteUserController,
};
