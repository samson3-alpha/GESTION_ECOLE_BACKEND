import express from 'express'
import { addEleve, deleteEleve, getEleves, updateEleve } from '../controllers/eleveController.js';

const eleveRouter = express.Router();

eleveRouter.get('/', getEleves);
eleveRouter.delete('/:id', deleteEleve);
eleveRouter.post('/', addEleve);
eleveRouter.put('/:id', updateEleve);

export default eleveRouter;