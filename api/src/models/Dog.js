const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull:false,
      defaultValue: Sequelize.literal('uuid_generate_v4()')
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    height: {
      type: DataTypes.STRING,
      allowNull: false
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },

    life_span: {
      type: DataTypes.STRING,
      allowNull: false
    },


  }, { timestamps: false });
};
