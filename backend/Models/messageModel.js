import mongoose from 'mongoose';

const mongoS = new mongoose.Schema({
    sId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'UserDB',
        required : true
    },
    rId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'UserDB',
        required : true
    },
    message : {
        type : String,
        required : true
    }
},{timestamps : true}) // this tells us when the message was sent and updated like create and update

const MessageDB = mongoose.model('MessageDB',mongoS);

export default MessageDB;