import UserDB from "../Models/userModel.js";

export const getuserSide = async (req,res) => {
    try {
        const loggeduser = req.user._id;
        const userFiltered = await UserDB.find({ _id : { $ne:loggeduser}}).select("-password");

        if(!userFiltered){
            return res.status(404).json({error : "No User Found"});
        }
        
        return res.status(200).json(userFiltered);
    } catch (error) {
        console.error("Error in getuserSlide", error.message);
        return res.status(500).json({error : "Internal Server Error Occured"});
    }
}