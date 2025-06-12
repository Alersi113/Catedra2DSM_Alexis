const bcryptjs = require('bcryptjs');
const { User } = require('../models');
const generateToken = require('../utils/generateToken');



const register = async (req, res) => {
  const { name, lastName, mail, password } = req.body;

  try {
    if (!name || !lastName || !mail || !password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: 'Todos los campos son obligatorios'
      });
    }

    const existingUser = await User.findOne({ where: { mail } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: true,
        message: 'Usuario ya registrado con este correo electrónico'
      });
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const user = await User.create({
      name,
      lastName,
      mail,
      password: hashedPassword,
    });

    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    //const token = await generateToken(user.id);

    const userData = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      mail: user.mail,
      //token
    };

    return res.status(201).json({
      success: true,
      error: false,
      data: userData,
      message: 'Usuario registrado exitosamente',
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: 'Error de servidor interno',
    });
  }
};

const login = async (req, res) => {
    const { mail, password } = req.body; 

    try {
        const user = await User.findOne({ where: { mail } });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Credenciales inválidas'
            });
        }

        const isPasswordValid = bcryptjs.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Credenciales inválidas'
            });
        }

        // Generar token JWT
        //const token = await generateToken(user.id);

        // Datos a devolver
        const userData = {
            id: user.id,
            name: user.name,
            lastName: user.lastName, 
            mail: user.mail,
            //token
        };

        return res.status(200).json({
            success: true,
            error: false,
            data: userData,
            message: 'Inicio de sesión exitoso',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Error del servidor',
        });
    }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.query.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: 'El ID del usuario es obligatorio',
      });
    }

    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: 'Usuario no encontrado',
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      data: user,
      message: 'Información del usuario obtenida correctamente',
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: 'Error del servidor',
    });
  }
};


module.exports = { register, login, getProfile };

