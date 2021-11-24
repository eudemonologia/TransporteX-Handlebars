var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  if (req.session.user) {
    res.render("admin", {
      title: "Admin",
      admin: true,
      user: req.session.user,
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
