const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedIn, isOwner } = require('../middleware');
const { listingSchema } = require('../Schema');
const listingsController = require('../controllers/listings');
const ExpressError = require('../utils/ExpressError');
const multer = require('multer');
const { cloudinary, storage } = require('../cloudConfig');
const upload = multer({ storage });

// Validation middleware for listings
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  }
  next();
};

// Route to show all listings and to create a new listing
router
  .route('/')
  .get(wrapAsync(listingsController.index)) // Show all listings
  .post(
    isLoggedIn,
    upload.single('listing[image]'), // Upload image to cloudinary
    validateListing,
    wrapAsync(listingsController.create)
  );

// Form to create a new listing
router.get('/new', isLoggedIn, listingsController.renderNewForm);

// Routes for specific listing by ID
router
  .route('/:id')
  .get(wrapAsync(listingsController.show)) // Show listing detail
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'), // Update image
    validateListing,
    wrapAsync(listingsController.update)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingsController.destroy)); // Delete listing

// Form to edit a listing
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingsController.renderEditForm));

module.exports = router;
