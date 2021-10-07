/**
 * CLIP-CHALLENGE - Controller.
 * Copyright 2021 androidexj9, Inc.
 *
 * General functions for clip-challenge.controller.js
 *
 * @author @androidexj9
 * @version 1.0
 *
 */

// Constants
const passport = require("passport");

// CLIP-CHALLENGE Controller
const CLIP_CHALLENGE_CONTROLLER = {};

// CLIP-CHALLENGE API Service
const CLIP_CHALLENGE_API_SERVICE = require("../services/clip-challenge-api.service");

// CLIP-CHALLENGE - Index/Login
CLIP_CHALLENGE_CONTROLLER.renderSigninForm = async (req, res) => {
  console.log("--> CLIP_CHALLENGE_CONTROLLER.renderSigninForm");

  // Render
  res.render("signin", { layout: "login-layout.hbs" });
};

// CLIP-CHALLENGE - Signin
CLIP_CHALLENGE_CONTROLLER.signin = passport.authenticate("local", {
  successRedirect: "/shop",
  failureRedirect: "/signin",
  failureFlash: true,
});

// CLIP-CHALLENGE - Logout
CLIP_CHALLENGE_CONTROLLER.signout = async (req, res) => {
  console.log("--> CLIP_CHALLENGE_CONTROLLER.signout");
  req.logout();

  // Redirect
  req.flash("success_msg", "User signout Successfully");
  res.redirect("/signin");
};

// CLIP-CHALLENGE - Shoes Shop
CLIP_CHALLENGE_CONTROLLER.shop = async (req, res) => {
  console.log("--> CLIP_CHALLENGE_CONTROLLER.shop");
  let products = [];

  try {
    const user = req.user.data;
    console.debug("clip-challenge.controller.js - shop - User-->", user);

    //const access_token = user.userAuth.access_token;
    const access_token = '10772492-58a7-4a61-a6c3-64fb2ad51645';
    console.debug("at-sce.controller.js - calculator - token-->", access_token);

    const responseProducts = await CLIP_CHALLENGE_API_SERVICE.getAllProducts(user.id, access_token);
    console.debug("clip-challenge.controller.js - shop - Response-->", responseProducts);

    if (responseProducts === null || responseProducts === undefined) {
      console.error("Service unavailable: CLIP_CHALLENGE_API_SERVICE.getAllProducts()");
      req.flash("error_msg", "Service unavailable");
    } else {
      products = responseProducts.data;
    }
  } catch (err) {
    console.error("clip-challenge.controller.js - shop - ", err.response);
    if (err.response && err.response.data) {
      const errorMsg = err.response.data.message;
      req.flash("error_msg", errorMsg);
    }
  } finally {
    // Render
    res.render("shop", { products });
  }
};

module.exports = CLIP_CHALLENGE_CONTROLLER;
