var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");

router.get("/", function (req, res, next) {
  res.render("contacto", {
    title: "Contacto",
    contacto: true,
    user: req.session.user,
  });
});

router.post("/", async (req, res, next) => {
  console.log(req.body);
  const mail = {
    to: "cristo.ottis@gmail.com",
    subject: "Contacto desde la web Transporte X",
    html: `${req.body.name} <br> email: ${req.body.email} <br> teléfono: ${req.body.tel} <br> ha enviado el siguiente mensaje: <br> ${req.body.comment} `,
  };

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail(mail);

  res.render("contacto", {
    title: "Contacto",
    contacto: true,
    user: req.session.user,
    mensaje: "Mensaje enviado correctamente",
  });
});

module.exports = router;
