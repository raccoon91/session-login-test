const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const models = require("../models");

router.get("/sign_up", function(req, res, next) {
  res.render("user/signup");
});

router.post("/sign_up", async function(req, res, next) {
  let body = req.body;

  let inputPassword = body.password;
  let salt = Math.round(new Date().valueOf() * Math.random()) + "";
  let hashPassword = crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");

  let result = models.user.create({
    name: body.userName,
    email: body.userEmail,
    password: hashPassword,
    salt: salt
  });

  res.redirect("/users/sign_up");
});

module.exports = router;
