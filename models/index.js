const Peminjam = require("./Peminjam.model");
const Peminjaman = require("./Peminjaman.model");
const Barang = require("./Barang.model");
const Transaksi = require("./Transaksi.model");

Peminjam.hasMany(Peminjaman, {
  foreignKey: "peminjamId",
  as: "peminjam-peminjaman",
});

Peminjaman.belongsTo(Peminjam, {
  foreignKey: "peminjamId",
  as: "peminjam",
});

Barang.hasMany(Peminjaman, {
  foreignKey: "kodeBarang",
  as: "barang-peminjaman",
});

Peminjaman.belongsTo(Barang, {
  foreignKey: "kodeBarang",
  as: "barang",
});

Peminjaman.hasMany(Transaksi, {
  foreignKey: "peminjamanId",
  as: "peminjaman-transaksi",
});

Transaksi.belongsTo(Peminjaman, {
  foreignKey: "peminjamanId",
  as: "peminjaman",
});

module.exports = {
  Transaksi,
  Peminjaman,
  Peminjam,
  Barang,
};
