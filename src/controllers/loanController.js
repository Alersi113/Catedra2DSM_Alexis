const { Loan, User, Book, Sequelize } = require('../models');
const { Op } = Sequelize;

const createLoan = async (req, res) => {
  const { id_user, id_book } = req.body;

  if (!id_user || !id_book) {
    return res.status(400).json({
      success: false,
      error: true,
      message: 'id_user y id_book son obligatorios',
    });
  }

  try {
    const user = await User.findByPk(id_user);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: 'Usuario no encontrado',
      });
    }

    const book = await Book.findByPk(id_book);
    if (!book || book.eliminated) {
      return res.status(404).json({
        success: false,
        error: true,
        message: 'Libro no encontrado o eliminado',
      });
    }

    const activeLoan = await Loan.findOne({
      where: {
        id_book,
        status: { [Op.not]: 'devuelto' },
        eliminated: false,
      },
    });

    if (activeLoan) {
      return res.status(400).json({
        success: false,
        error: true,
        message: 'El libro tiene un préstamo activo o con retraso, no se puede prestar',
      });
    }

    const today = new Date();
    const devolutionDate = new Date(today);
    devolutionDate.setDate(today.getDate() + 7);

    const loan = await Loan.create({
      id_user,
      id_book,
      loanDate: today.toISOString().split('T')[0],
      devolutionDate: devolutionDate.toISOString().split('T')[0],
      status: 'prestado',
      eliminated: false,
    });

    await book.update({ available: false });

    return res.status(201).json({
      success: true,
      error: false,
      data: loan,
      message: 'Préstamo registrado exitosamente',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: 'Error del servidor al registrar el préstamo',
    });
  }
};

module.exports = { createLoan };
