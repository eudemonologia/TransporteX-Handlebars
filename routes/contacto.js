var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("contacto", { title: "Contacto", contacto: true });
});

module.exports = router;
