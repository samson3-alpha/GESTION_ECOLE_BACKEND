import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {

    try {
        const { email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "email déjà utilisé" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "Email n'existe pas" });

        const validPassword = await bcrypt.compare(password, existingUser.password);

        if (!validPassword) return res.status(401).json({ message: "Mot de passe incorrect" });

        const payload = {
            id: existingUser._id,
            role: existingUser.role
        };

        const S_K = process.env.JWT_SECRET;

        const token = jwt.sign(payload, S_K, { expiresIn: '1min' });
        res.status(200).json(token);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}