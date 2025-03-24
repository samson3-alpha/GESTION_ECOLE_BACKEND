import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import classRouter from './routes/classeRoute.js';
import eleveRouter from './routes/eleveRoute.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/classes', classRouter);
app.use('/api/eleves', eleveRouter);

app.get("/", (req, res) => {
    res.send("API de gestion d'école est en marche !");
 });
 
 const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));