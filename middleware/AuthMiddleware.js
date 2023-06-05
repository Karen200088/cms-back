import TokenService from "../service/TokenService.js";

const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            res.status(401).json({message: "User not authorized"})
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            res.status(401).json({message: "User not authorized"})
        }

        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            res.status(401).json({message: "User not authorized"})
        }

        req.user = userData;
        next();
    } catch (e) {
        res.status(401).json({message: "User not authorized"})
    }
}

export default authMiddleware;