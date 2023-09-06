import Router from "express";
import {body} from "express-validator";
import userController from "../controllers/UserController.js";

const userRouter = new Router();

userRouter.post("/registration",
  body('email').isEmail(),
  body('password').isLength({min: 6, max: 100})
  , userController.registration);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/refresh", userController.refreshToken);

export default userRouter;