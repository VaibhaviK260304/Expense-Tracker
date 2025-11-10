import express from 'express'
import mongoose, { Mongoose } from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();

// 1. Initialize Express
const app = express();

// 2. CRITICAL FIX: Trust the Ingress Load Balancer
// This prevents the '405 Method Not Allowed' error when traffic is routed 
// through the Minikube Load Balancer (Ingress).
app.set('trust proxy', 1);

// 3. Define allowed origins for CORS (dev-friendly)
const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3002',
    'http://127.0.0.1:3002',
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    'http://192.168.49.2',
];

// Configure and use CORS middleware
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps/curl)
        if (!origin) return callback(null, true);
        // In dev, allow all to avoid preflight/CORS issues
        if (process.env.ALLOW_ALL_ORIGINS === 'true' || process.env.NODE_ENV !== 'production') {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        const msg = `CORS blocked origin: ${origin}`;
        return callback(new Error(msg), false);
    },
    credentials: true,
}));

// Ensure preflight requests succeed
app.options('*', cors());

// Standard Middleware
app.use(express.json());

// Import Controllers
import { postSignup, postLogin } from './contollers/user.js';
import { postTransaction, getTransactions, deleteTransaction } from './contollers/transaction.js';

// Connect to MongoDB with retry and without exiting the app
const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error('MONGO_URI is not set. Set it in server/.env');
        return;
    }
    let attempt = 0;
    const tryConnect = async () => {
        attempt += 1;
        try {
            await mongoose.connect(uri, {
                serverSelectionTimeoutMS: 10000,
                socketTimeoutMS: 20000,
            });
            console.log('MongoDB connected');
        } catch (error) {
            console.error(`MongoDB connection error (attempt ${attempt}):`, error?.message || error);
            setTimeout(tryConnect, Math.min(30000, attempt * 3000));
        }
    };
    tryConnect();
};
connectDB();

app.get('/', (req, res)=>{
    res.json({
        message: 'Welcome to expense tracker API'
    })
})

// API Routes
app.post('/signup', postSignup);
app.post('/login', postLogin);
app.post('/transaction', postTransaction);
app.get('/transactions', getTransactions);
app.delete('/transaction/:id', deleteTransaction);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
