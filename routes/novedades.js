var express = require("express");
var router = express.Router();
var publicacionesModel = require("../models/publicacionesModel");
var util = require("util");
var cloudinary = require("cloudinary").v2;
var uploader = util.promisify(cloudinary.uploader.upload);
var destroy = util.promisify(cloudinary.uploader.destroy);

/* const articulos = [
  {
    id: 1,
    titulo: "Título",
    subtitulo: "Subtítulo",
    contenido:
      "Descripción - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam quo placeat rem. Similique dolores cupiditate nam eaque, quidem officiis, voluptatibus quos sed, unde repudiandae a illo doloribus placeat quis qui!",
  },
  {
    id: 2,
    titulo: "Título",
    subtitulo: "Subtítulo",
    contenido:
      "Descripción - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam quo placeat rem. Similique dolores cupiditate nam eaque, quidem officiis, voluptatibus quos sed, unde repudiandae a illo doloribus placeat quis qui!",
  },
  {
    id: 3,
    titulo: "Título",
    subtitulo: "Subtítulo",
    contenido:
      "Descripción - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam quo placeat rem. Similique dolores cupiditate nam eaque, quidem officiis, voluptatibus quos sed, unde repudiandae a illo doloribus placeat quis qui!",
  },
]; */

router.get("/", async (req, res, next) => {
  try {
    var articulos = await publicacionesModel.getUltimasPublicaciones();
    articulos = articulos.map((articulo) => {
      if (articulo.imagen) {
        const imagen = cloudinary.image(articulo.imagen, {
          width: 300,
          height: 300,
          crop: "fill",
        });
        articulo.imagen = imagen;
      } else {
        articulo.imagen = "";
      }
      return articulo;
    });

    res.render("novedades", {
      title: "Novedades",
      novedades: true,
      articulos: articulos,
      user: req.session.user,
    });
  } catch (error) {
    console.log(error);
  }
});

secured = async (req, res, next) => {
  try {
    if (req.session.user) {
      next();
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
};

router.get("/eliminar/:id", secured, async (req, res, next) => {
  try {
    const id = req.params.id;
    publicacionesModel.getPublicacion(id).then((articulo) => {
      if (articulo.imagen) {
        destroy(articulo.imagen).then(() => {
          console.log("Imagen eliminada");
        });
      }
    });
    await publicacionesModel.eliminarPublicacion(id);
    res.redirect("/novedades");
  } catch (error) {
    console.log(error);
  }
});

router.get("/modificar/:id", secured, async (req, res, next) => {
  try {
    const id = req.params.id;
    const articulo = await publicacionesModel.getPublicacion(id);
    res.render("modificar", {
      title: "Modificar",
      modificar: true,
      articulo: articulo,
      user: req.session.user,
      layout: "layout",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/modificar/:id", secured, async (req, res, next) => {
  try {
    const id = req.params.id;
    var newPublicacion = {
      id_usuarios: req.session.id_usuario,
      ...req.body,
    };
    console.log(newPublicacion);
    if (req.files && Object.keys(req.files).length > 0) {
      publicacionesModel.getPublicacion(id).then((articulo) => {
        if (articulo.imagen) {
          destroy(articulo.imagen).then(() => {
            console.log("Imagen eliminada");
          });
        }
      });
      var img = req.files.imagen;
      var imagen = (await uploader(img.tempFilePath)).public_id;
      newPublicacion.imagen = imagen;
    }
    console.log(newPublicacion);
    await publicacionesModel.modificarPublicacion(newPublicacion, id);
    res.redirect("/novedades");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
