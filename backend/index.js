import express from 'express';
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./config/db.js";

import userRoutes from './routes/userRoutes.js';
import siteRoutes from './routes/siteRoutes.js';
import questionRoutes from './routes/questionRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/questions', questionRoutes);

app.listen(3000, () => {console.log("Listening on port 3000")});