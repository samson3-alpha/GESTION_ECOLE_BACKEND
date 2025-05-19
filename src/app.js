import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import classRouter from './routes/classeRoute.js';
import eleveRouter from './routes/eleveRoute.js';
import professeurRouter from './routes/professeurRoute.js';
import userRouter from './routes/userRoute.js';
import { verifyToken } from './middlewares/verifyToken.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/classes', classRouter);
app.use('/api/eleves', eleveRouter);
app.use('/api/professeurs', professeurRouter);
app.use('/api/users', userRouter);
app.get("/api/protected", verifyToken, (req, res) => {
    res.json({ message: "Accès autorisé", user: req.user });
  });

app.get("/", (req, res) => {
    res.send("API de gestion d'école est en marche !");
 });
 
 const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));