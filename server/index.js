import express from "express";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import;
dotenv.config()
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRouter from "./routers/auth";
import post from "./routers/post";
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({ extended:true, limit: '30mb'}));

app.use(cors());
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.w3lbizd.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("MongoDB connected...")
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

connectDB();
app.use('/api/auth', authRouter);
app.use('/api/post', post);

app.listen(PORT, () => {
    console.log(`Server is running on the port http:/localhost:${PORT}`);
})