import express from 'express'
import mongoose, { Mongoose } from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//Connect to mogoDB
const connectDB = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI,)
    if(connect){
        console.log('MongoDB connected')
    }
};
connectDB();

app.get('/', (req, res)=>{
    res.json({
        message: 'Welcome to expense tracker'
    })
})

const PORT = process.env.PPRT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})