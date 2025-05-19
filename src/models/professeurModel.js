import mongoose from "mongoose";

const professeurSchema = new mongoose.Schema({
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
    specialite: {
        type: String,
        required: true
    },
    dateEntree: {
        type: Date,
        required: true
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classe"
    }],
    adresse: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
});

const Professeur = mongoose.model("Professeur", professeurSchema);

export default Professeur;