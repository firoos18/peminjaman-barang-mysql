const Barang = require("../models/Barang.model");
const createError = require("http-errors");

async function getAllBarang(req, res, next) {
  try {
    const barang = await Barang.findAll();

    const response = {
      status: 200,
      message: "success",
      data: barang,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function getBarangById(req, res, next) {
  const { id } = req.params;

  try {
    const barang = await Barang.findByPk(id);
    if (!barang)
      throw createError.NotFound(`Barang with Barang ID ${id} is Not Found`);

    const response = {
      status: 200,
      message: "success",
      data: barang,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function addBarang(req, res, next) {
  const { nama, merek, jenis, unit } = req.body;
  try {
    const barang = await Barang.create({
      nama: nama,
      jenis: jenis,
      merek: merek,
      unit: unit,
    });

    const response = {
      status: 201,
      message: "added",
      data: barang,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

async function editBarang(req, res, next) {
  const { id } = req.params;
  const { nama, merek, jenis, unit } = req.body;
  try {
    const barang = await Barang.findByPk(id);
    if (!barang)
      throw createError.NotFound(`Barang with Barang ID ${id} is Not Found`);

    if (nama) barang.nama = nama;
    if (merek) barang.merek = merek;
    if (jenis) barang.jenis = jenis;
    if (unit) barang.unit = unit;

    await barang.save();

    const response = {
      status: 200,
      message: "success",
      data: barang,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function deleteBarang(req, res, next) {
  const { id } = req.params;
  try {
    const barang = await Barang.findByPk(id);
    if (!barang)
      throw createError.NotFound(`Barang with Barang ID ${id} is Not Found`);

    await barang.destroy();

    res.status(200).json({
      status: 200,
      message: "deleted",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllBarang,
  getBarangById,
  addBarang,
  editBarang,
  deleteBarang,
};
