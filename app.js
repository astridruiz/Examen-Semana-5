const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("empresa_db", "root", "Admr*#2407", {
  host: "localhost",
  dialect: "mysql"
});

sequelize.authenticate()
  .then(() => console.log("Conectado a MySQL correctamente"))
  .catch(err => console.error("Error al conectar:", err));

module.exports = sequelize;

