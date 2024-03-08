import express from 'express';
import cors from 'cors';
import router from './routes/leetcode.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/leetcode', router);
app.listen(8000, () => console.log('Server Running'));