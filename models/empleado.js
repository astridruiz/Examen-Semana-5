const { DataTypes } = require("sequelize");
const sequelize = require("../app");

const Empleado = sequelize.define("Empleado", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  puesto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salario: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Empleado;
