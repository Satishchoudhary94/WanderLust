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

// Validation middleware
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(error.details[0].message, 400);
  }
  next();
};

// Route for index and creating new listings
router
  .route('/')
  .get(wrapAsync(listingsController.index)) // Show all listings
  .post(isLoggedIn, validateListing, upload.single("listing[image]"), wrapAsync(listingsController.create)); // Create new listing

// Form to create a new listing (should be before :id to avoid conflict)
router.get('/new', isLoggedIn, listingsController.renderNewForm);

// Routes for specific listing operations
router
  .route('/:id')
  .get(wrapAsync(listingsController.show)) // Show a specific listing
  .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingsController.update)) // ✅ Added image upload
  .delete(isLoggedIn, isOwner, wrapAsync(listingsController.destroy)); // Delete listing

// Form to edit a listing
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingsController.renderEditForm));

module.exports = router;
