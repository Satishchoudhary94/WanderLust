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
    initData.data = initData.data.map((obj) => ({ ...obj, owner: '68766fef6dae81a4a9a5d636' })); // Replace with actual user ID
   // Insert the initial data into the database
   await Listing.insertMany(initData.data);
   console.log("Database seeded successfully!");
 } catch (err) {
   console.log("Error seeding database:", err);
 } finally {
   mongoose.connection.close();
 }
};

seedDatabase();
