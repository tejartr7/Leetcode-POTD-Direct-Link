import express from 'express';
import cors from 'cors';
import router from './routes/leetcode.js';

const app = express();

app.use(express.json());

app.use(cors({
    origin: '*',
    credentials: true
}));

// Middleware to add Access-Control-Allow-Origin header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://leetcode.rtrdev.me/');
    next();
});

app.use('/leetcode', router);

app.listen(8000, () => console.log('Server Running'));
