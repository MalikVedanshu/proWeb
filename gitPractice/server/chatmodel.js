import mongoose, { mongo } from "mongoose";

let chatschema = new mongoose.Schema({
    allmessages: [
        {
            message: {
                type: String
            }
        }
    ]
})

const ChatModel = mongoose.model("OurChat", chatschema, "chat-app-collection");

export default ChatModel;