const { DataTypes, NUMBER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('movie', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    genre_ids: {
      type: DataTypes.ARRAY(NUMBER),
      allowNull: false
    },
    original_lenguage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    original_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    poster_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vote_average: {
      type: DataTypes.DOUBLE,
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};
