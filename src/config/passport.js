/**
 * CLIP-CHALLENGE - Auth Passport.
 * Copyright 2021 androidexj9, Inc.
 *
 * General functions for passport.
 *
 * @author @androidexj9
 * @version 1.0
 *
 */

// Constants
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
let userAuthToken = {};

// CLIP-CHALLENGE Service
const CLIP_CHALLENGE_API_SERVICE = require("../services/clip-challenge-api.service.js");

const CLIP_CHALLENGE_USER_ID = process.env.CLIP_CHALLENGE_USER_ID;

// CLIP-CHALLENGE Auth Helper
const { encrypt } = require("../helpers/auth.helper");
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      let user = await CLIP_CHALLENGE_API_SERVICE.getCustomerById(CLIP_CHALLENGE_USER_ID);
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.data.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await CLIP_CHALLENGE_API_SERVICE.getCustomerById(id);
  user.data["userAuth"] = userAuthToken;
  done(null, user);
});
