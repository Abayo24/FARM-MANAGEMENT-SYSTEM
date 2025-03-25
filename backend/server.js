import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cropRoutes from './routes/crop.route.js';
import resourceRoutes from './routes/resource.route.js';
import activityRoutes from './routes/activity.route.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // to parse incoming request bodies

app.use('/api/crops', cropRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/activities', activityRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
}); 
