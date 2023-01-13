import express from 'express'
import ChatModel from './chatmodel.js';


const app = express();
const port = 5000;
app.use(express.json());

import './dbConnect.js';

app.get('/api/home', (req,res) => {
    console.log("This is my home route")
    res.send("text route is working");
})

app.post('/create/collection',  async (req,res) => {
    try {
        let data = new ChatModel();
        await data.save();
        return res.status(200).json({msg: "New collection created."})
    }
    catch(error) {
        return res.status(500).json({error: "Internal server Error"})
    }
})

app.post("/api/textall", async (req,res) => {
    try {
        let allData = await ChatModel.findById("63c1450cb0754530960856e5");
        // console.log(allData);
        let myMessage = req.body.message;
        if(!myMessage) return res.status(401).json({error: "Invalid request"});
        if(allData.allmessages.length > 50) {
            allData.allmessages.unshift({message: myMessage})
            allData.allmessages.pop();
        } else {
            allData.allmessages.unshift({message: myMessage});
        }
        
        allData.save();
        return res.status(200).json({msg: "Message Sent Successfully"})
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"});
    }
})

app.get("/api/getdata", async (req,res) => {
    try {
        let allData = await ChatModel.findById("63c1450cb0754530960856e5");
        if(!allData) return res.status(401).json({error: "Invalid ID"});

        return res.status(200).json({msg: allData.allmessages});
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"});
    }
})



app.listen(port, () => {
    console.log(`App started at ${port}`);
});
