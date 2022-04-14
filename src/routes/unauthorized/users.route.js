/**
 * Created by Mb
 */

const express = require("express");
const router = express.Router();
const { forgotJwtAuth } = require("../../helpers/jwt.helper");
const controller = require("../../controllers").user;
const ContactFormController = require("../../controllers/contactForm.controller")

//@route    POST auth/login
//@desc     login user
//@access   Public
router.post("/login", controller.login);
//@route    POST auth/signup
//@desc     Sign up user (create user account)
//@access   Public
router.post("/signup", controller.signup);

router.post("/submitContactForm", ContactFormController.submitForm)
router.get("/getFormData",ContactFormController.getAllForms)

router.get("/sendEmail", controller.sendEmail)


module.exports = router;
