const express = require("express")
const router = express.Router();

const userValidate = require("../../validates/client/user.validate");

const controller = require("../../controllers/client/user.controller");

router.get("/login",  controller.login);

router.post("/login", userValidate.login, controller.loginPost);

router.get("/register", controller.register);

router.post("/register",userValidate.checkUser, controller.registerPost);

router.get("/logout", controller.logout);

module.exports = router;