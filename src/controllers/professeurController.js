import Professeur from "../models/professeurModel.js";
import Classe from "../models/classeModel.js"


export const getProfesseurs = async(req, res) => {
    try {
        const professeurs = await Professeur.find();
        return res.status(200).json(professeurs);
    } catch (error) {
        res.status(500).json({message : 'Erreur lors de la recup des donnees'})
    }
}


export const addProfesseur = async (req, res) => {
    try {
        const newProfesseur = req.body;
        const professeur = new Professeur(newProfesseur);
        await professeur.save();
        res.status(201).json(professeur)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
    
}