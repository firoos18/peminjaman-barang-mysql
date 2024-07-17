const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/Auth.controller");

router.post("/admin/register", AuthController.registerAdmin);

router.post("/admin/login", AuthController.loginAdmin);

router.post("/peminjam/register", AuthController.registerPeminjam);

router.post("/peminjam/login", AuthController.loginPeminjam);

module.exports = router;
