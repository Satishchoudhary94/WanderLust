const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js'); 
const { listingSchema, reviewSchema } = require('../Schema.js');


const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(error.details[0].message, 400);
  }else{
    next();
  }
};


//index route for listings
router.get('/',wrapAsync(async (req, res)=>{
    const allListing = await Listing.find({});
   res.render('listings/index', { listings: allListing });
} ))

// create route for listings
router.get('/new', (req, res) => {
    res.render('listings/new');
});

router.post("/", validateListing,wrapAsync(async (req, res , next) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
  
}));

//show route for listings
router.get('/:id', wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id).populate('reviews');
    res.render('listings/show', { listing });
}));

//edit route for listings
router.get('/:id/edit', wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render('listings/edit', { listing });
}));

//update route for listings
router.put('/:id', validateListing, wrapAsync(async (req, res) => {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body.listing, { new: true });
    res.redirect(`/listings/${updatedListing._id}`);
}));

//Delete route for listings
router.delete('/:id', wrapAsync(async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect('/listings');
}));

module.exports = router;