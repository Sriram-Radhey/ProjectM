import jwt from 'jsonwebtoken';
import UserDB from '../Models/userModel.js';

const routeProtect = async (req,res,next) => {
try {
    const token = req.cookies.jwt;

    if(!token){
     return res.status(401).json({error : "Unauthorized Access - Error finding token"});
    }

    const verifyT = jwt.verify(token, process.env.JWT_SECRET);

    if(!verifyT){
        return res.status(401).json({error : "Unauthorized - Error verifying token"});
    }

    const user =await UserDB.findById(verifyT.userId).select("-password");

    if(!user) {
        return res.status(404).json({error: "User not found"});
    }

    req.user = user;

    next();

} catch (error) {
    console.log(`Error in Middleware : ${error}`);
    return res.status(500).json({error : "Internal Error Occured"});
}
}

export default routeProtect;