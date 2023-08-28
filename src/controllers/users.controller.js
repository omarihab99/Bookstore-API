const {
  userLoginService,
  userRegisterService,
  checkoutService
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
module.exports = {
  userLoginController,
  userRegisterController,
  checkoutController
};
