import express from "express"
import { addClasse, deleteClass, getClasseById, getClasses, updateClasse } from "../controllers/classeController.js";

const classRouter = express.Router();

classRouter.post("/", addClasse);
classRouter.get("/", getClasses);
classRouter.get("/:id", getClasseById)
classRouter.delete("/:id", deleteClass);
classRouter.put("/:id", updateClasse);
//classRouter.get("/classesNbEleves", getClassesWithNbEleves);

export default classRouter;