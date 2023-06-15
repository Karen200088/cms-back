import Router from "express";
import userController from "../controllers/UserController.js";
import {body} from "express-validator"

const userRouter = new Router();

userRouter.post("/registration",
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 100})
    , userController.registration);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.post("/refresh", userController.refreshToken);

export default userRouter;