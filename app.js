const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate'); 
const Session = require('express-session'); 
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

const reviewsRouter = require('./routes/review.js');
const listingsRouter = require('./routes/listing.js');
const userRouter = require('./routes/user.js');
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

const sessionOptions = {
  secret: 'thisshouldbeabettersecret',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true } // Uncomment this line if using HTTPS
  cookie: {
    maxAge: Date.now() + 1000 * 60 * 60 * 24 ,

    httpOnly: true, // Helps prevent XSS attacks
  }
}

app.get('/', (req, res) => {
  res.send('Hello, World!');  
});

app.use(Session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
 res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

//routes

app.use('/listings', listingsRouter);
app.use('/listings/:id/reviews', reviewsRouter);
app.use('/', userRouter);



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