const express = require('express');
const router = express.Router();
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync.js');
const { saveRedirectUrl } = require('../middleware.js');
const users = require('../controllers/users.js');

// Signup
router.route('/signup')
  .get(users.renderSignupForm)
  .post(wrapAsync(users.signup));

// Login
router.route('/login')
  .get(users.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: true
    }),
    users.login
  );

// Logout
router.get('/logout', users.logout);

module.exports = router;
