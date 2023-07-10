import userService from "../service/UserService.js";
import {validationResult} from "express-validator";

class UserController {

  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(403).json(errors?.errors);
      }

      const {email, password} = req.body;
      const userData = await userService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true});
      return res.json(userData);
    } catch (error) {
      console.log(error);
      next();
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const userData = await userService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true});
      return res.json(userData);
    } catch (error) {
      console.log(error);
      next();
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies;

      if (refreshToken) {
        const userData = await userService.logout(refreshToken);
        if (userData) {
          res.clearCookie('refreshToken');
          res.json({message: "You have been successfully logged out!"});
        }
      } else {
        res.json({message: "You are already logged out!"});
      }
    } catch (error) {
      console.log(error);
      next();
    }
  }

  async refreshToken(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return res.json(userData);
    } catch (error) {
      console.log(error);
      next();
    }
  }
}

export default new UserController();