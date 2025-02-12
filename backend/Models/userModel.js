import mongoose from "mongoose";

const mongoS = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
    },
    userName : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 7
    },
    gender : {
        type : String,
        required : true,
        enum : ['male','female']
    },profilePic : {
        type : String,
        default : ''
    }
})

const UserDB = mongoose.model('UserDB',mongoS)

export default UserDB;