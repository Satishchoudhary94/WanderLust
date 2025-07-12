const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  image: {
    filename: String,
    url: {
      type: String,
      default:
        "https://unsplash.com/photos/a-large-swimming-pool-surrounded-by-palm-trees-_pPHgeHz1uk",
      set: (v) =>
        v ===
        "https://unsplash.com/photos/a-large-swimming-pool-surrounded-by-palm-trees-_pPHgeHz1uk"
          ? "default link"
          : v,
    },
  },
  location: String,
  country: String,
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
