var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("servicios", {
    title: "Servicios",
    servicios: true,
    user: req.session.user,
  });
});

module.exports = router;
