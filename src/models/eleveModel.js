import mongoose from "mongoose";

const eleveSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    dateNaissance: {
        type: Date,
        required: true
    },
    idClass: {
        type: mongoose.Schema.Types.ObjectId,  // Référence à une classe (assurez-vous de remplacer par un modèle de classe)
        ref: 'Classe',  // Remplacez 'Classe' par le nom de votre modèle pour les classes
        required: true
    },
    dateEntree: {
        type: Date,
        required: true
    },
    sexe: {
        type: String,
        enum: ['M', 'F'],  // M pour masculin, F pour féminin, vous pouvez étendre cette liste si nécessaire
        required: true
    },
    contactNom: {
        type: String,
        required: true
    },
    contactNumero: {
        type: String,
        required: true
    }
});

const Eleve = mongoose.model('Eleve', eleveSchema);

export default Eleve;
