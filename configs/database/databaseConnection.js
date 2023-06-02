import mongoose from "mongoose";
import "dotenv/config";

const dbConnectionString = process.env.MONGODB_CONNECTION_STRING;

export const connectDB=()=>{
    mongoose
    .connect(dbConnectionString)
    .then(() => {
        console.log("database connected");
    })
    .catch((e) => {
        console.log(e);
    });
}