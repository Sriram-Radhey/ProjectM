import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import genWtoken from "../Token-U/userTg.js";

export const signup = async (req,res) =>{
    try {
        const {fullName,userName,password,confirmpassword,gender} = req.body;

        if(password !== confirmpassword){
            return res.status(400).json({message : 'Both passwords are differnt'})
        }

        const user = await User.findOne({userName});
        
        if(user){
            return res.status(400).json({message : 'User already exists'});
        }
        // hashing password
        const salt = await bcrypt.genSalt(12);
        const hashedpass = await bcrypt.hash(password,salt);

        //profile pic Creation
        const boyprofile = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlprofile = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        // creating new user now
        const newUser = new User({
            fullName,
            userName,
            password : hashedpass,
            gender,
            profilePic : gender === 'male' ? boyprofile : girlprofile
        })
        if(newUser){
        // create token
        genWtoken(newUser._id,res);

        await newUser.save()

        return res.status(201).json({
            _id : newUser._id,
            userName : newUser.userName,
            fullName : newUser.fullName,
            profilePic : newUser.profilePic
        })
    }else{
        return res.status(400).json({message : 'Error with creating new user'});
    }
    } 
    catch (error) {
        console.log(`Error in signUp: ${error}`)
        return res.status(500).json({message : 'There is an internal error'})
    }
}

export const login = async (req,res) =>{
    try {
        const {userName, password} = req.body
        const user = await User.findOne({userName})
        const isPassW = await bcrypt.compare(password,user?.password || '')
        
        if(!user || !isPassW){
            return res.status(400).json({message : 'Something wrong with username or password'})
        }

        genWtoken(user._id,res)

        return res.status(200).json({
            _id : user._id,
            fullName : user.fullName,
            userName : user.userName,
            profilePic : user.profilePic
        })
    } catch (error) {
        console.log(`Error in Login : ${error}`);
        return res.status(500).json({message : 'There is an internal error'})
    }


}

export const logout = (req,res) =>{
    try {
        res.cookie('jwt','',{maxAge : 0});
        return res.status(200).json({message : 'Logged out successfully'})  
    } catch (error) {
        console.log(`Error in Logout : ${error}`);
        return res.status(500).json({message : 'There is an internal error'})
    }
}