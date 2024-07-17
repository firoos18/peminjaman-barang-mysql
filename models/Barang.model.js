const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../helpers/init_mysql");

class Barang extends Model {}

Barang.init(
  {
    kode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    merek: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Barang",
    tableName: "barang",
    timestamps: false,
  }
);

module.exports = Barang;
