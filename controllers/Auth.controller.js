const Admin = require("../models/Admin.model");
const Peminjam = require("../models/Peminjam.model");
const { signAccessToken } = require("../helpers/jwt_helper");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

async function registerAdmin(req, res, next) {
  const { email, nama, alamat, password } = req.body;
  try {
    const isExist = await Admin.findOne({ where: { email } });
    if (isExist) throw createError.Conflict(`${email} is Already Registered`);

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      email: email,
      nama: nama,
      alamat: alamat,
      password: hashedPassword,
    });

    const response = {
      status: 201,
      message: "registered",
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

async function loginAdmin(req, res, next) {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin)
      throw createError.NotFound(
        `Admin with email address ${email} is Not Found`
      );

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) throw createError.Conflict("Invalid Password");

    const accessToken = await signAccessToken(email);

    const response = {
      status: 200,
      message: "success",
      data: {
        email: admin.email,
        token: accessToken,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function registerPeminjam(req, res, next) {
  const { email, nama, alamat, password } = req.body;
  try {
    const isExist = await Peminjam.findOne({ where: { email } });
    if (isExist) throw createError.Conflict(`${email} is Already Registered`);

    const hashedPassword = await bcrypt.hash(password, 10);

    await Peminjam.create({
      email: email,
      nama: nama,
      alamat: alamat,
      password: hashedPassword,
    });

    const response = {
      status: 201,
      message: "registered",
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

async function loginPeminjam(req, res, next) {
  const { email, password } = req.body;
  try {
    const peminjam = await Peminjam.findOne({ where: { email } });
    if (!peminjam)
      throw createError.NotFound(
        `Peminjam with email address ${email} is Not Found`
      );

    const passwordMatch = await bcrypt.compare(password, peminjam.password);
    if (!passwordMatch) throw createError.Conflict("Invalid Password");

    const accessToken = await signAccessToken(email);

    const response = {
      status: 200,
      message: "success",
      data: {
        email: peminjam.email,
        token: accessToken,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerAdmin,
  loginAdmin,
  registerPeminjam,
  loginPeminjam,
};
