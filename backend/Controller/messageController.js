import Convs from '../Models/conversModel.js'
import messG from '../Models/messageModel.js'

export const messageSend = async (req, res) => {
    try {
        const {message} = req.body;
        const {id : rId} = req.params; // this is basic destructuring to get the id from the params and if any other data is sent in the body of the request
        const sId = req.user._id;

        let conversation  = await Convs.findOne({
            participate :{ $all : [sId,rId]},
        })
        
        if(!conversation){
            conversation = await Convs.create({
                participate : [sId,rId],
            })
        }

        const newM =  new messG({
            sId,
            rId,
            message,
        })

        if(newM){
            conversation.messages.push(newM._id)
        }

        await Promise.all([conversation.save(),newM.save()]);
        
        return res.status(201).json(newM);

    } catch (error) {
        console.log(`Errror in Controller : ${error}`);
        res.status(500).json({message : "Internal Error Occured"});
    }
}

export const getMessages = async (req,res) => {
    try {
        const {id : UchatId} = req.params;
        const sId = req.user._id;

        const conversation = await Convs.findOne({
            participate : { $all :[sId,UchatId]},
        }).populate("messages"); // this are actual messages
 
        if(!conversation){
            return res.status(404).json({message : "No Conversation Found"});
        }
       return res.status(200).json(conversation.messages);

    } catch (error) {
        console.log(`Errror in Controller : ${error}`);
        res.status(500).json({message : "Internal Error Occured"});
    }
}