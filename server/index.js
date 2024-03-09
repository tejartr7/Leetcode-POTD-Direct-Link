import express from 'express';
import cors from 'cors';
import router from './routes/leetcode.js';

const app = express();

app.use(express.json());

// Remove the CORS middleware here since you're setting it globally below
app.use(cors({
    origin: '*',
}));

// Middleware to add Access-Control-Allow-Origin header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://leetcode.rtrdev.me');
    // Add other CORS headers if needed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Allow credentials if needed
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use('/leetcode', router);

app.listen(8000, () => console.log('Server Running'));
