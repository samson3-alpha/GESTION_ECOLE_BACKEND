export const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user?.role;
  
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Accès refusé. Rôle non autorisé." });
      }
  
      next();
    };
  };