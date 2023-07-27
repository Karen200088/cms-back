import bcrypt from "bcryptjs";
import UserDto from "../dtos/UserDto.js";
import {UserModel} from "../models/UserModel.js";
import TokenService from "./TokenService.js";
import ApiErrorHandler from "../helpers/ApiErrorHandler.js";

class UserService {

  async registration(email, password, firstName, lastName) {
    try {
      const candidate = await UserModel.findOne({where: {email: email}});
      if (candidate !== null) {
        return ApiErrorHandler.badRequest(409, "An account is already registered with this email");
      }
      const hashPassword = await bcrypt.hash(password, 4);
      const user = await UserModel.create({
        email,
        password: hashPassword,
        firstName,
        lastName
      });

      const userDto = new UserDto(user);
      const tokens = await TokenService.generateTokens({...userDto});

      await TokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
        ...tokens,
        user: userDto,
      }
    } catch (error) {
      console.log(error);
    }

  }

  async login(email, password) {
    try {
      const user = await UserModel.findOne({where: {email: email}})
      if (!user) {
        return ApiErrorHandler.badRequest(404, 'User with this email was not found');
      }
      const isPasswordEquals = await bcrypt.compare(password, user.password);
      if (!isPasswordEquals) {
        return ApiErrorHandler.badRequest(401, 'Wrong password');
      }
      const userDto = new UserDto(user);
      const tokens = await TokenService.generateTokens({...userDto});

      await TokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
        ...tokens,
        user: userDto,
      }
    } catch (error) {
      console.log(error);
    }

  }

  async logout(refreshToken) {
    return await TokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    try {
      if (!refreshToken) {
        return ApiErrorHandler.unauthorizedError();
      }
      const userData = TokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await TokenService.findToken(refreshToken);

      if (!userData || !tokenFromDb) {
        return ApiErrorHandler.unauthorizedError();
      }

      const user = await UserModel.findOne({
        where: {
          id: userData.id
        }
      });
      const userDto = new UserDto(user);
      const tokens = await TokenService.generateTokens({...userDto});

      await TokenService.saveToken(userDto.id, tokens.refreshToken);

      return {...tokens, user: userDto}
    } catch (error) {
      console.log(error);
    }

  }
}

export default new UserService();