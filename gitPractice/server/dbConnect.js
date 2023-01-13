import mongoose from "mongoose";
import config from 'config';

async function dbConnect() {
    try {
        await mongoose.connect(config.get("mongo_url"))
        console.log("DB is connected")
    }
    catch (error) {
        console.log(error)
    }
}
dbConnect();