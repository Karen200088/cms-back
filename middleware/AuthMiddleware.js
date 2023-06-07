import TokenService from "../service/TokenService";

const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({message: "User not authorized"})
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(401).json({message: "User not authorized"})
        }

        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            return res.status(401).json({message: "User not authorized"})
        }

        req.user = userData;
        next();
    } catch (e) {
        return res.status(401).json({message: "User not authorized"})
    }
}

export default authMiddleware;