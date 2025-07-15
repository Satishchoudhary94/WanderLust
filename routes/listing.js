const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js'); 
const { listingSchema } = require('../Schema.js');
const { isLoggedIn } = require('../middleware.js');


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
router.get('/new', isLoggedIn, (req, res) => {
  res.render('listings/new');
});

router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res , next) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id; // Set the owner to the logged-in user
  await newListing.save();
  req.flash('success', 'New listing created successfully!');
  res.redirect("/listings");
  
}));

//show route for listings
router.get('/:id', wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id).populate('reviews').populate("owner");
    if (!listing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings');
    }
    res.render('listings/show', { listing });
}));

//edit route for listings
router.get('/:id/edit', isLoggedIn, wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings');
    }
    res.render('listings/edit', { listing });
}));

//update route for listings
router.put('/:id', isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body.listing, { new: true });
    req.flash('success', 'Listing updated successfully!');
    res.redirect(`/listings/${updatedListing._id}`);
}));

//Delete route for listings
router.delete('/:id', isLoggedIn, wrapAsync(async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    req.flash('success', 'Listing deleted successfully!');
    res.redirect('/listings');
}));

module.exports = router;