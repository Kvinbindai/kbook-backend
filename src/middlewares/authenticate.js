const { verifyToken } = require("../services/token-service");
const createError = require("http-errors");
const userService = require("../services/user-service");
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization; //Bearer Token
    if (!token) {
        return res.status(401).json({
            message : "Unauthorized"
        })
    }
    else {
      const accessToken = token.split(" ")[1];
      const user = verifyToken(accessToken);
      const foundUser = await userService.findUserById(user.id)
      delete foundUser.password
      // console.log(foundUser)
      req.user = foundUser;
      
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticate };
