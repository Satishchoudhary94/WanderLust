const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

const MONGO_URI = "mongodb://127.0.0.1:27017/WanderLust";

main().then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));  

async function main() {
  await mongoose.connect(MONGO_URI );
}

const seedDatabase = async () => {
 try {
   await Listing.deleteMany({});
   await Listing.insertMany(initData.data);
   console.log("Database seeded successfully!");
 } catch (err) {
   console.log("Error seeding database:", err);
 } finally {
   mongoose.connection.close();
 }
};

seedDatabase();
