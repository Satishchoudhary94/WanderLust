const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const User = require('../models/user.js');
const passport = require('passport');
const{ saveRedirectUrl } = require('../middleware.js');

// Serve the signup page at /user/signup
router.get('/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/signup', wrapAsync(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash('success', 'Welcome to WanderLust!');
      res.redirect('/listings');
    });

  } catch (e) {
    // Handle duplicate email error
    if (e.code === 11000 && e.keyPattern && e.keyPattern.email) {
      req.flash('error', 'Email already in use. Try logging in or use a different email.');
    } else {
      req.flash('error', e.message);
    }
    res.redirect('/signup');
  }
}));

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login',
  saveRedirectUrl, 
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }),
  (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.redirectUrl || '/listings'; 
    res.redirect(redirectUrl);
  }
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash('error', 'Logout failed. Please try again.');
      return res.redirect('/listings');
    }
    req.flash('success', 'Goodbye!');
    res.redirect('/login');
  });
});

module.exports = router;
