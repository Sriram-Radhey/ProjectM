import mongoose from "mongoose";

const converS = new mongoose.Schema({
    participate : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'UserDB'
        },
    ],
    messages : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'MessageDB',
            default : [],
        },
    ]
},{timestamps : true})

const ConverDB = mongoose.model('converDB',converS);

export default ConverDB;