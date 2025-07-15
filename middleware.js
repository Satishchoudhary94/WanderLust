const isLoggedIn = (req, res, next) => {

  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl; // Store the original URL
    req.flash('error', 'You must be logged in to create a listing');
    return res.redirect('/login');
  }
  next();
};

module.exports = { isLoggedIn };

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.redirectUrl = req.session.returnTo;
 // ✅ Fix: res.locals, not req.locals
  }
  next();
};

   