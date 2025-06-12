// models/Loan.js
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_book: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    loanDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    devolutionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'prestado',
    },
    eliminated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  });

  Loan.associate = (models) => {
    Loan.belongsTo(models.User, { foreignKey: 'id_user' });
    Loan.belongsTo(models.Book, { foreignKey: 'id_book' });
  };

  return Loan;
};
