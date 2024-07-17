const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../helpers/jwt_helper");
const TransaksiController = require("../controllers/Transaksi.controller");

router.get("/", verifyAccessToken, TransaksiController.getAllTransaksi);

router.get("/:id", verifyAccessToken, TransaksiController.getAllUserTransaksi);

router.patch(
  "/:id",
  verifyAccessToken,
  TransaksiController.toggleTransaksiStatus
);

module.exports = router;
