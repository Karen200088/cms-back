import jwt from "jsonwebtoken";
import {UserModel} from "../models/UserModel.js";

class TokenService {

    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: "30m"
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, {
            expiresIn: "60d"
        });
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await UserModel.findOne({where: {id: userId}});
        if (tokenData) {
             tokenData.token = refreshToken;
            return await tokenData.save();
        }
        return await UserModel.create({user: userId, refreshToken});
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET_KEY);
        } catch (e) {
            return null;
        }
    }

    async removeToken(refreshToken) {
        const tokenData = await UserModel.findOne({where: {token: refreshToken}});
        if (tokenData) {
            tokenData.token = null;
            return await tokenData.save();
        }
    }

    async findToken(refreshToken) {
        return await UserModel.findOne({where: {token: refreshToken}});
    }
}

export default new TokenService();