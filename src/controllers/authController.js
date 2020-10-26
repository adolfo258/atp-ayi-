const jwt = require("jsonwebtoken");

//PERMISO SEGUN EL ROL DEL USUARIO
const checkRoles = roles => {
  return (req, res, next) => {
    const userRol = req.user.rol;

    const authorized = roles.find(rol => userRol === rol);

    if (authorized) {
      next();
    } else {
      return res.status(400).json({ message: "Unauthorized rol" });
    }
  };
};
//LE ENTREGO EL TOKEN AL USER AUTENTICADO
const tokenCreate = (req, res) => {
  const user = req.user;

  const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "1h" });

  const bearerToken = `Bearer ${token}`;

  return res.json({ login: "Login succesfully", bearerToken });
};

module.exports = { checkRoles, tokenCreate };
