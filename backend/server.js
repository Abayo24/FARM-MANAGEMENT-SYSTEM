import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cropRoutes from './routes/crop.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse incoming request bodies

app.use('/api/crops', cropRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
}); 
