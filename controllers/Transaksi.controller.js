const { Transaksi, Peminjam, Peminjaman, Barang } = require("../models/index");
const createError = require("http-errors");

async function getAllTransaksi(req, res, next) {
  try {
    const transaksi = await Transaksi.findAll({
      include: [
        {
          model: Peminjaman,
          as: "peminjaman",
          include: [
            {
              model: Peminjam,
              as: "peminjam",
              attributes: ["id", "nama", "alamat", "email"],
            },
            {
              model: Barang,
              as: "barang",
              attributes: ["kode", "nama", "merek", "jenis", "unit"],
            },
          ],
          attributes: ["id", "jumlahBarang", "tanggalPinjam", "tanggalKembali"],
        },
      ],
      attributes: ["id", "status"],
    });

    const response = {
      status: 200,
      message: "success",
      data: transaksi,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function getAllUserTransaksi(req, res, next) {
  const { id } = req.params;

  try {
    const transaksi = await Transaksi.findAll({
      include: [
        {
          model: Peminjaman,
          as: "peminjaman",
          where: { peminjamId: id },
          include: [
            {
              model: Peminjam,
              as: "peminjam",
              attributes: ["id", "nama", "alamat", "email"],
            },
            {
              model: Barang,
              as: "barang",
              attributes: ["kode", "nama", "merek", "jenis", "unit"],
            },
          ],
          attributes: ["id", "jumlahBarang", "tanggalPinjam", "tanggalKembali"],
        },
      ],
      attributes: ["id", "status"],
    });

    const response = {
      status: 200,
      message: "success",
      data: transaksi,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function toggleTransaksiStatus(req, res, next) {
  const { id } = req.params;

  try {
    const transaksi = await Transaksi.findByPk(id, {
      include: [
        {
          model: Peminjaman,
          as: "peminjaman",
          where: { peminjamId: id },
          include: [
            {
              model: Peminjam,
              as: "peminjam",
              attributes: ["id", "nama", "alamat", "email"],
            },
            {
              model: Barang,
              as: "barang",
              attributes: ["kode", "nama", "merek", "jenis", "unit"],
            },
          ],
          attributes: ["id", "jumlahBarang", "tanggalPinjam", "tanggalKembali"],
        },
      ],
      attributes: ["id", "status"],
    });

    transaksi.status =
      transaksi.status === "dipinjam" ? "dikembalikan" : "dipinjam";

    await transaksi.save();

    const response = {
      status: 200,
      message: "success",
      data: transaksi,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllTransaksi,
  getAllUserTransaksi,
  toggleTransaksiStatus,
};
