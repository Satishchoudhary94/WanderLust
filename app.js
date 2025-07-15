const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');  

const reviews = require('./routes/review.js');
const listings = require('./routes/listing.js');
const ExpressError = require('./utils/ExpressError.js');

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

//routes
app.use('/listings', listings);
app.use('/listings/:id/reviews', reviews);

// Error handling
app.all('*', (req, res,next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Something went wrong' } = err;
  res.status(statusCode).render("listings/error", { message });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});