import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const genWtoken = (userId,res) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn : "12d",
    })

    res.cookie('jwt',token,{
        maxAge : 12 * 24 * 60 * 60 * 1000, // this only consider milliseconds for limiting age
        httpOnly : true,
        sameSite : 'strict', // this is for preventing CSRF attack
        secure : process.env.NODE_ENV !== 'development' ? true : false
    })
}

export default genWtoken;