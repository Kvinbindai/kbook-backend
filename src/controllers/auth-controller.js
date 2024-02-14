const userService = require("../services/user-service");
const createError = require("http-errors");
const {
  addUserSchema,
  loginUserSchema,
} = require("../validators/user-validator");
const { createAccessToken } = require("../services/token-service");
const { hashPassword, comparePassword } = require("../services/hash-service");

module.exports = {
  register: async (req, res, next) => {
    try {
      const value = await addUserSchema.validateAsync(req.body);
      value.password = await hashPassword(value.password);
      const foundUser = await userService.findUserByEmail(value.email);
      //   console.log(foundUser)
      if (foundUser) {
        return res.status(400).json({
          message: "User already Create",
        });
      } else {
        const newUser = await userService.createUser(value);
        delete newUser.password;
        return res.status(201).json({
          message: "Create User Complete",
          data: newUser,
        });
      }
      // console.log(value)
    } catch (err) {
       next(err);
    }
  },
  login: async (req, res, next) => {
    try {
      const value = await loginUserSchema.validateAsync(req.body);
      const foundUser = await userService.findUserByEmail(value.email);
      if (!foundUser) createError(404, "User Not Found");
      const isMatch = await comparePassword(value.password, foundUser.password);
      if (!isMatch) createError(404, "Invalid Credentials");
      const { id, email, role } = foundUser;
      const payload = { id, email, role };
      const accessToken = createAccessToken(payload);
      return res.status(200).json({
        message: "Login Success",
        accessToken,
      });
    } catch (err) {
       next(err);
    }
  },
};
