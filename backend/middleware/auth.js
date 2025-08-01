import jwt  from "jsonwebtoken";
import User from "../models/User.js" ;

const   authMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({
            message: "No token, authorization denied"
        });
    }
//401 is not authorizated
//500 internal server error
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (err) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
}


export default authMiddleware;