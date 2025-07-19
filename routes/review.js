const express = require('express');
const router = express.Router({ mergeParams: true });

const wrapAsync = require('../utils/wrapAsync.js');
const { reviewSchema } = require('../Schema.js');
const { isLoggedIn, isReviewAuthor } = require('../middleware.js');
const reviewsController = require('../controllers/reviews.js');
const ExpressError = require('../utils/ExpressError.js');

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(error.details[0].message, 400);
  }
  next();
};

router
  .route('/')
  .post(isLoggedIn, validateReview, wrapAsync(reviewsController.createReview));

router
  .route('/:reviewId')
  .delete(isLoggedIn, isReviewAuthor, wrapAsync(reviewsController.deleteReview));

module.exports = router;
