import Classe from "../models/classeModel.js"
import Eleve from "../models/eleveModel.js";

export const addClasse = async (req, res) => {
    try {
        const { nom, categorie, type, serie } = req.body;
        const classe = new Classe ({ nom, categorie, type, serie });
        await classe.save();
        res.status(201).json(classe); 
    } catch (error) {
        res.status(400).json({message : error.message })
    }
};

// export const getClasses = async (req, res) => {

//     try {
//         const classes = await Classe.find();
//         res.status(200).json(classes);

//     } catch (error) {
//         res.status(500).json({message : error.message})
//     }
    
// };

export const getClasses = async (req, res) => {
    try {
        const classes = await Classe.aggregate([
            {
                $lookup: {
                    from: "eleves", // Nom de la collection des élèves
                    localField: "_id", // ID de la classe dans la collection Classe
                    foreignField: "idClass", // Référence à la classe dans Eleve
                    as: "eleves" // Stocker les élèves correspondants dans un tableau
                }
            },
            {
                $project: {
                    _id: 1,
                    nom: 1,
                    categorie: 1,
                    type: 1,
                    serie: 1,
                    nbEleves: { $size: "$eleves" } // Compter le nombre d'élèves
                }
            }
        ]);

        return res.status(200).json(classes);
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la récupération des classes", error });
    }
};

export const getClasseById = async (req, res) => {

    const classId = req.params.id;
    try {
        // Utilisation de Mongoose pour trouver la classe par son _id
        const classDetails = await Classe.findById(classId);

        if (!classDetails) {
            return res.status(404).json({ message: 'Classe non trouvée' });
        }

        res.json(classDetails); // Retourne les détails de la classe trouvée
    } catch (error) {
        console.error('Erreur lors de la récupération de la classe:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};


export const deleteClass = async (req, res) => {

    try {
        const classe = await Classe.findByIdAndDelete(req.params.id);
        res.status(200).json({message : "Classe supprimée!"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
    
};

export const updateClasse = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, categorie, type, serie,nbEleves, professeurs } = req.body;

        // Vérifier si la classe existe
        const classeExistante = await Classe.findById(id);
        if (!classeExistante) {
            return res.status(404).json({ message: "Classe non trouvée" });
        }

        // Mettre à jour la classe
        const classeMiseAJour = await Classe.findByIdAndUpdate(
            id,
            { nom, categorie, type, serie, nbEleves, professeurs },
            { new: true, runValidators: true } // Retourne la classe mise à jour
        );

        res.status(200).json(classeMiseAJour);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};