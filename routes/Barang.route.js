const express = require("express");
const router = express.Router();
const BarangController = require("../controllers/Barang.controller");
const { verifyAccessToken } = require("../helpers/jwt_helper");

router.get("/", verifyAccessToken, BarangController.getAllBarang);

router.get("/:id", verifyAccessToken, BarangController.getBarangById);

router.post("/", verifyAccessToken, BarangController.addBarang);

router.patch("/:id", verifyAccessToken, BarangController.editBarang);

router.delete("/:id", verifyAccessToken, BarangController.deleteBarang);

module.exports = router;
