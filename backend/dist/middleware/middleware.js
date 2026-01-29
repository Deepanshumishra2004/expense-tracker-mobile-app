import Jwt, {} from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export const AuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        res.status(401).json({ message: "token doesn't exist" });
    try {
        const decoded = Jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        req.username = decoded.username;
        req.email = decoded.email;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "authenication fails" });
    }
};
//# sourceMappingURL=middleware.js.map