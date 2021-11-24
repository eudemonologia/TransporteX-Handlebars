var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("nosotros", {
    title: "Nosotros",
    nosotros: true,
    user: req.session.user,
  });
});

module.exports = router;
