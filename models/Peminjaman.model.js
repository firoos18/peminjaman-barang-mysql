const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../helpers/init_mysql");
const Barang = require("./Barang.model");
const Peminjam = require("./Peminjam.model");

class Peminjaman extends Model {
  toJSON() {
    const attributes = { ...this.get() };
    delete attributes.peminjamId;
    delete attributes.kodeBarang;
    return attributes;
  }
}

Peminjaman.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    peminjamId: {
      type: DataTypes.INTEGER,
      references: {
        model: Peminjam,
        key: "id",
      },
    },
    kodeBarang: {
      type: DataTypes.INTEGER,
      references: {
        model: Barang,
        key: "kode",
      },
    },
    jumlahBarang: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tanggalPinjam: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    tanggalKembali: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Peminjaman",
    tableName: "peminjaman",
    timestamps: false,
  }
);

module.exports = Peminjaman;
