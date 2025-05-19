import express from 'express'
import { addProfesseur, getProfesseurs } from "../controllers/professeurController.js";

const professeurRouter = express.Router();

professeurRouter.get('/', getProfesseurs);
professeurRouter.post('/', addProfesseur);


export default professeurRouter;