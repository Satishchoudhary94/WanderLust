const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const Listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');  

const MONGO_URI = "mongodb://127.0.0.1:27017/WanderLust";

main().then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));  

async function main() {
  await mongoose.connect(MONGO_URI );
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method')); 
app.engine('ejs', ejsMate);  
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

//index route for listings
app.get('/listings',async (req,res)=>{
    const allListing = await Listing.find({});
   res.render('listings/index', { listings: allListing });
} )

// create route for listings
app.get('/listings/new', (req, res) => {
    res.render('listings/new');
});

app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//show route for listings
app.get('/listings/:id', async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render('listings/show', { listing });
});

//edit route for listings
app.get('/listings/:id/edit', async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render('listings/edit', { listing });
});

//update route for listings
app.put('/listings/:id', async (req, res) => {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body.listing, { new: true });
    res.redirect(`/listings/${updatedListing._id}`);
});

//Delete route for listings
app.delete('/listings/:id', async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect('/listings');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});