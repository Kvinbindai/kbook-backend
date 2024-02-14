const { verifyToken } = require("../services/token-service");
const createError = require("http-errors");
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
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticate };
