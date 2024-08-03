import express from 'express'
import mongoose, { Mongoose } from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import User from './models/User.js';
import Transaction from './models/Transaction.js'

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

//API for Sign Up
app.post('/signup', async (req, res)=>{
    const {name, email, password, dob} = req.body;
    const user = new User({
        name, 
        email, 
        password,
        dob: new Date(dob)
    });

    try{                                       //try to save th api and if their is in error so send it to the catch block which displays the exact error message.
    const saveUser = await user.save()

    res.json({
        success: true,
        message: 'User created successfully',
        data: saveUser
    })
    }
    catch(e){
        res.json({
            success: false,
            message: e.message,
            data: null
        })
    }

})

//API for Log In
app.post('/login', (req, res)=>{
    const {email, password} = req.body;
    
    const user = User.findOne({
        email: email,
        password: password,
    });
    if(user){
        return res.json({
            success: true,
            message: 'User logged in successfully',
            data: user
        })
    }
    else{
        return res.json({
            success: false,
            message: 'Invalid email or password',
            data: null
        })
    }
})

const PORT = process.env.PPRT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})