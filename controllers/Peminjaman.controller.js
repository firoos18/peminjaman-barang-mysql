const { Transaksi, Barang, Peminjam, Peminjaman } = require("../models/index");
const createError = require("http-errors");
const sequelize = require("../helpers/init_mysql");

async function getAllPeminjaman(req, res, next) {
  try {
    const peminjaman = await Peminjaman.findAll({
      include: [
        { model: Barang, as: "barang", attributes: ["kode", "nama"] },
        { model: Peminjam, as: "peminjam", attributes: ["id", "email"] },
      ],
    });

    const response = {
      status: 200,
      message: "success",
      data: peminjaman,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function getPeminjamanById(req, res, next) {
  const { id } = req.params;

  try {
    const peminjaman = await Peminjaman.findByPk(id, {
      include: [
        { model: Barang, as: "barang", attributes: ["kode", "nama"] },
        { model: Peminjam, as: "peminjam", attributes: ["id", "email"] },
      ],
    });
    if (!peminjaman)
      throw createError.NotFound(
        `Peminjaman with Peminjaman ID ${id} is Not Found`
      );

    const response = {
      status: 200,
      message: "success",
      data: peminjaman,
    };
  } catch (error) {
    next(error);
  }
}

async function addPeminjaman(req, res, next) {
  const {
    peminjamId,
    kodeBarang,
    jumlahBarang,
    tanggalPinjam,
    tanggalKembali,
  } = req.body;

  try {
    // Input validation
    if (
      !peminjamId ||
      !kodeBarang ||
      !jumlahBarang ||
      !tanggalPinjam ||
      !tanggalKembali
    ) {
      throw createError.BadRequest("All fields are required");
    }

    // Start transaction
    const transaction = await sequelize.transaction();

    try {
      // Find Peminjam
      const peminjam = await Peminjam.findByPk(peminjamId, { transaction });
      if (!peminjam)
        throw createError.NotFound(
          `User with Peminjam ID ${peminjamId} is Not Found`
        );

      // Find Barang
      const barang = await Barang.findByPk(kodeBarang, { transaction });
      if (!barang)
        throw createError.NotFound(
          `Barang with Kode Barang ${kodeBarang} is Not Found`
        );

      // Check availability of Barang
      if (jumlahBarang > barang.unit)
        throw createError.Conflict(`Barang is Not Available`);

      // Update Barang unit
      barang.unit -= jumlahBarang;
      await barang.save({ transaction });

      // Create Peminjaman
      const peminjaman = await Peminjaman.create(
        {
          peminjamId,
          kodeBarang,
          jumlahBarang,
          tanggalPinjam,
          tanggalKembali,
        },
        { transaction }
      );

      // Create Transaksi
      await Transaksi.create(
        {
          status: "dipinjam",
          peminjamanId: peminjaman.id,
        },
        { transaction }
      );

      // Commit transaction
      await transaction.commit();

      // Response
      res.status(201).json({
        status: 201,
        message: "added",
        data: peminjaman,
      });
    } catch (error) {
      // Rollback transaction in case of error
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

async function editPeminjaman(req, res, next) {
  const { id } = req.params;
  const {
    peminjamId,
    kodeBarang,
    jumlahBarang,
    tanggalPinjam,
    tanggalKembali,
  } = req.body;

  try {
    const peminjaman = await Peminjaman.findByPk(id);
    if (!peminjaman)
      throw createError.NotFound(
        `Peminjaman with Peminjaman ID ${id} is Not Found`
      );

    if (peminjamId) peminjaman.peminjamId = peminjamId;
    if (kodeBarang) peminjaman.kodeBarang = kodeBarang;
    if (jumlahBarang) peminjaman.jumlahBarang = jumlahBarang;
    if (tanggalPinjam) peminjaman.tanggalPinjam = tanggalPinjam;
    if (tanggalKembali) peminjaman.tanggalKembali = tanggalKembali;

    await peminjaman.save();

    const response = {
      status: 200,
      message: "success",
      data: peminjaman,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function togglePeminjamanStatus(req, res, next) {
  const { id } = req.params;

  try {
    const peminjaman = await Peminjaman.findByPk(id);
    if (!peminjaman)
      throw createError.NotFound(
        `Peminjaman with Peminjaman ID ${id} is Not Found`
      );

    peminjaman.status =
      peminjaman.status === "dipinjam" ? "dikembalikan" : "dipinjam";

    await peminjaman.save();

    const response = {
      status: 200,
      message: "updated",
      data: peminjaman,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function deletePeminjaman(req, res, next) {
  const { id } = req.params;

  try {
    const peminjaman = await Peminjaman.findByPk(id);
    if (!peminjaman)
      throw createError.NotFound(
        `Peminjaman with Peminjaman ID ${id} is Not Found`
      );

    await peminjaman.destroy();

    res.status(200).json({
      status: 200,
      message: "deleted",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllPeminjaman,
  getPeminjamanById,
  addPeminjaman,
  editPeminjaman,
  togglePeminjamanStatus,
  deletePeminjaman,
};
