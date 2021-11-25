var express = require("express");
var router = express.Router();
var usuariosModel = require("../models/usuariosModel");

router.get("/", function (req, res, next) {
  if (req.session.user) {
    res.redirect("/admin");
  } else {
    res.render("login", {
      title: "Login",
      login: true,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { usuario, password } = req.body;
    console.log(usuario, password);
    const data = await usuariosModel.getUsuarioByUsernameAndPassword(
      usuario,
      password
    );
    if (data != undefined) {
      req.session.user = data.nombre;
      res.redirect("/admin");
    } else {
      res.render("login", {
        title: "Login",
        login: true,
        error: "Usuario o contraseña incorrectos",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
