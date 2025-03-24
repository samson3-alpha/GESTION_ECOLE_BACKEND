import Eleve from "../models/eleveModel.js";

export const addEleve = async (req, res) => {
    try {

        console.log('Donnees recues:', req.body);
        const { nom, prenom, dateNaissance, idClass, dateEntree, sexe, contactNom, contactNumero } = req.body;

        // Créer une nouvelle instance d'Eleve avec les données reçues
        const newEleve = new Eleve({
            nom,
            prenom,
            dateNaissance,
            idClass,
            dateEntree,
            sexe,
            contactNom,
            contactNumero
        });

        // Sauvegarder l'élève dans la base de données
        await newEleve.save();
        return res.status(201).json({ message: 'Élève ajouté avec succès', eleve: newEleve });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'élève', error });
    }
};

// Récupérer tous les élèves
export const getEleves = async (req, res) => {
    try {
        const eleves = await Eleve.find().populate('idClass', 'nom'); // Optionnel : ajoute les informations de la classe associée
        return res.status(200).json(eleves);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des élèves', error });
    }
};

// Supprimer un élève
export const deleteEleve = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifier si l'élève existe
        const eleve = await Eleve.findById(id);
        if (!eleve) {
            return res.status(404).json({ message: 'Élève non trouvé' });
        }

        // Supprimer l'élève de la base de données
        await Eleve.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Élève supprimé avec succès' });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la suppression de l\'élève', error });
    }
};

// Mettre à jour les informations d'un élève
export const updateEleve = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, dateNaissance, idClass, dateEntree, sexe, contactNom, contactNumero } = req.body;

        // Vérifier si l'élève existe
        const eleve = await Eleve.findById(id);
        if (!eleve) {
            return res.status(404).json({ message: 'Élève non trouvé' });
        }

        // Mettre à jour l'élève avec les nouvelles données
        eleve.nom = nom || eleve.nom;
        eleve.prenom = prenom || eleve.prenom;
        eleve.dateNaissance = dateNaissance || eleve.dateNaissance;
        eleve.idClass = idClass || eleve.idClass;
        eleve.dateEntree = dateEntree || eleve.dateEntree;
        eleve.sexe = sexe || eleve.sexe;
        eleve.contactNom = contactNom || eleve.contactNom;
        eleve.contactNumero = contactNumero || eleve.contactNumero;

        // Sauvegarder les modifications
        await eleve.save();
        return res.status(200).json({ message: 'Élève mis à jour avec succès', eleve });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'élève', error });
    }
};
