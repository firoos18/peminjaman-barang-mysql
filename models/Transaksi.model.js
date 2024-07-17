const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../helpers/init_mysql");
const Peminjaman = require("./Peminjaman.model");

class Transaksi extends Model {}

Transaksi.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["dipinjam", "dikembalikan"],
      allowNull: false,
    },
    peminjamanId: {
      type: DataTypes.INTEGER,
      references: {
        model: Peminjaman,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Transaksi",
    tableName: "transaksi",
    timestamps: false,
  }
);

module.exports = Transaksi;
