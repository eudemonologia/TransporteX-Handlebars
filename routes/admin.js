var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("admin", {
    title: "Admin",
    admin: true,
    user: req.session.user,
  });
});

module.exports = router;
