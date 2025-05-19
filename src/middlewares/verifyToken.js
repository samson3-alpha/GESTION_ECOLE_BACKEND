import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Accès refusé. Token manquant ou mal formé.' });
    }

    const token = authHeader.split(' ')[1]; // On extrait le token sans le "Bearer "

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // contient les infos du payload (ex: id, role, etc.)
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token invalide ou expiré' });
    }
};
