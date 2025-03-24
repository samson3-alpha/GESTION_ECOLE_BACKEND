import mongoose from "mongoose";

const ClasseSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    categorie: { type: String, required: true },
    type: { type: String, required: true },
    serie: { type: String, required: true },
    nbEleves: { type: Number, default: 0, required: false },
    professeurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Professeur' }]
}, { timestamps: true });

export default mongoose.model('Classe', ClasseSchema);

