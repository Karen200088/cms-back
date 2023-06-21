import TokenService from "../service/TokenService.js";
import ApiErrorHandler from "../helpers/ApiErrorHandler.js";

const authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json(ApiErrorHandler.unauthorizedError());
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return res.status(401).json(ApiErrorHandler.unauthorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return res.status(401).json(ApiErrorHandler.unauthorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    return res.status(401).json(ApiErrorHandler.unauthorizedError(), error);
  }
}

export default authMiddleware;