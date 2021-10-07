/**
 * CLIP-CHALLENGE - Routes.
 * Copyright 2021 androidexj9, Inc.
 *
 * General functions for clip-challenge.routes.js
 *
 * @author @androidexj9
 * @version 1.0
 *
 */

// Constants
const express = require("express");
const router = express.Router();
const path = require("path");

// CLIP-CHALLENGE Auth Helper
const { isAuthenticated } = require("../helpers/auth.helper");

// CLIP-CHALLENGE Controller
const {
  renderSigninForm,
  signin,
  signout,
  shop
} = require("../controllers/clip-challenge.controller");

// ============= Sub Routes =============

// CLIP-CHALLENGE - Index
router.get("/", renderSigninForm);

// CLIP-CHALLENGE - Login
router.get("/signin", renderSigninForm);
router.post("/signin", signin);

// CLIP-CHALLENGE - Logout
router.get("/signout", signout);

// CLIP-CHALLENGE - Shop
router.get("/shop", isAuthenticated, shop);

module.exports = router;