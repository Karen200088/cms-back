import {UserModel} from "../models/UserModel";
import bcrypt from "bcrypt";
import UserDto from "../dtos/UserDto";
import TokenService from "./TokenService";

class UserService {

    async registration(email, password) {
        const candidate = await UserModel.findOne({where: {email: email}});
        if (candidate !== null) {
            return {
                message: "An account is already registered with this email"
            }
        }
        const hashPassword = await bcrypt.hash(password, 4);
        const user = await UserModel.create({
            email,
            password: hashPassword
        });

        const userDto = new UserDto(user);
        const tokens = await TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
    }

    async login(email, password) {
        const user = await UserModel.findOne({where: {email: email}})
        if (!user) {
            return {
                message: 'User with this email was not found'
            }
        }
        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if (!isPasswordEquals) {
            return {
                message: 'Wrong password'
            }
        }
        const userDto = new UserDto(user);
        const tokens = await TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
    }

    async logout(refreshToken) {

        return await TokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            return {
                message: "User not authorized"
            }
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            return {
                message: "User not authorized"
            }
        }
        const user = await UserModel.findOne(userData.id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }
}

export default new UserService();