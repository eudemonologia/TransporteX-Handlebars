var express = require("express");
var router = express.Router();
var publicacionesModel = require("../models/publicacionesModel");
var util = require("util");
var cloudinary = require("cloudinary").v2;
var uploader = util.promisify(cloudinary.uploader.upload);

router.get("/", async (req, res, next) => {
  try {
    const articulos = await publicacionesModel.getUltimasPublicaciones();
    res.render("admin", {
      title: "Admin",
      admin: true,
      user: req.session.user,
      articulos: articulos,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  if (
    req.body.titulo != "" &&
    req.body.subtitulo != "" &&
    req.body.contenido != ""
  ) {
    try {
      var imagen = "";
      if (req.files && Object.keys(req.files).length > 0) {
        var img = req.files.imagen;
        imagen = (await uploader(img.tempFilePath)).public_id;
      }
      var newPublicacion = {
        id_usuarios: req.session.id_usuario,
        ...req.body,
        imagen: imagen,
      };
      await publicacionesModel.publicar(newPublicacion);
      res.redirect("/novedades");
    } catch (error) {
      res.render("admin", {
        title: "Admin",
        admin: true,
        user: req.session.user,
        error: "Error al publicar",
      });
    }
  } else {
    res.render("admin", {
      title: "Admin",
      admin: true,
      user: req.session.user,
      error: "Todos los campos son obligatorios",
    });
  }
});

module.exports = router;
