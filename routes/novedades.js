var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("novedades", { title: "Novedades", novedades: true });
});

module.exports = router;
