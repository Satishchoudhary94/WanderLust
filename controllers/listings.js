const { constrainedMemory } = require('process');
const Listing = require('../models/listing');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_API_KEY;

const geocodingClient = mbxGeocoding({ accessToken: mapToken });
// Show all listings
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render('listings/index', { listings: allListings });
};

// Show a specific listing
module.exports.show = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate('owner')
    .populate({
      path: 'reviews',
      populate: {
        path: 'author',
      },
    });

  if (!listing) {
    req.flash('error', 'Listing not found');
    return res.redirect('/listings');
  }

  res.render('listings/show', { listing, mapToken: process.env.MAP_API_KEY });
};

// Render new listing form
module.exports.renderNewForm = (req, res) => {
  res.render('listings/new');
};

// Create a new listing (with image upload)
module.exports.create = async (req, res) => {
   let response = await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
  .send()
  
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  // Handle uploaded image from multer
  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }
  // Set geometry based on geocoding response
  if (response.body.features.length) {
    newListing.geometry = {
      type: 'Point',
      coordinates: response.body.features[0].geometry.coordinates,
    };
  } else {
    req.flash('error', 'Location not found');
    return res.redirect('/listings/new');
  }

  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash('success', 'New listing created successfully!');
  res.redirect('/listings');
};

// Render edit form
module.exports.renderEditForm = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash('error', 'Listing not found');
    return res.redirect('/listings');
  }
  res.render('listings/edit', { listing });
};
module.exports.update = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  // Update basic fields
  listing.title = req.body.listing.title;
  listing.description = req.body.listing.description;
  listing.price = req.body.listing.price;
  listing.location = req.body.listing.location;
  listing.country = req.body.listing.country;

  // If new image uploaded via multer
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await listing.save();
  req.flash('success', 'Listing updated successfully!');
  res.redirect(`/listings/${listing._id}`);
};


// Delete listing
module.exports.destroy = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash('success', 'Listing deleted successfully!');
  res.redirect('/listings');
};
