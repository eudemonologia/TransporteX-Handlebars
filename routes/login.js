var express = require("express");
var router = express.Router();

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

router.post("/", function (req, res, next) {
  var user = req.body.usuario;
  var pass = req.body.password;
  if (user == "admin" && pass == "admin") {
    req.session.user = user;
    res.redirect("/admin");
  } else {
    res.redirect("/login");
  }
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
