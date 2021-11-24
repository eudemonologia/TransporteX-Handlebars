var express = require("express");
var router = express.Router();

const articulos = [
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
];

router.get("/", function (req, res, next) {
  res.render("novedades", {
    title: "Novedades",
    novedades: true,
    articulos: articulos,
    user: req.session.user,
  });
});

module.exports = router;
