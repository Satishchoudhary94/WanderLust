// controllers/users.js

const User = require('../models/user.js');
const passport = require('passport');

// Render Signup Page
module.exports.renderSignupForm = (req, res) => {
  res.render('users/signup');
};

// Handle Signup POST
module.exports.signup = async (req, res, next) => {
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
    if (e.code === 11000 && e.keyPattern?.email) {
      req.flash('error', 'Email already in use. Try logging in or use a different email.');
    } else {
      req.flash('error', e.message);
    }
    res.redirect('/signup');
  }
};

// Render Login Page
module.exports.renderLoginForm = (req, res) => {
  res.render('users/login');
};

// Handle Login POST
module.exports.login = (req, res) => {
  req.flash('success', 'Welcome back!');
  const redirectUrl = res.locals.redirectUrl || '/listings';
  res.redirect(redirectUrl);
};

// Handle Logout
module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash('error', 'Logout failed. Please try again.');
      return res.redirect('/listings');
    }
    req.flash('success', 'Goodbye!');
    res.redirect('/login');
  });
};
