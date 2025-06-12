const bcrypt = require('bcryptjs');
const { User } = require('../models');

async function register(req, res) {
  try {
    const { name, lastName, mail, password } = req.body;

    if (!name || !lastName || !mail || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verificar si usuario ya existe
    const existingUser = await User.findOne({ where: { mail } });
    if (existingUser) {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }

    // Hashear la contraseña
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Crear usuario
    const user = await User.create({
      name,
      lastName,
      mail,
      password: hashedPassword,
      isActive: true,
      isBaseUser: false
    });

    res.status(201).json({ message: 'Usuario registrado', userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = { register };
