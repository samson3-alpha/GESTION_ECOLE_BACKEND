import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import User from '../models/userModel.js';

const createAdmin = async () => {
    
  await mongoose.connect('mongodb://localhost:27017/GESTION_ECOLE'); // adapte l’URL

  const email = 'admin@example.com';
  const password = '1234'; // Mot de passe que tu veux pour l’admin

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = new User({
    email,
    password: hashedPassword,
    isPasswordChanged: true, // L’admin n’a pas besoin de changer son mot de passe à la 1re connexion
    role: 'admin' // Optionnel si tu veux gérer les rôles
  });

  await admin.save();
  console.log('Admin créé avec succès');
  mongoose.disconnect();
}

createAdmin();
