require('dotenv').config(); // Ensure environment variables are loaded

const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

const MONGO_URI = process.env.ATLAS_URL;

main().then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ Connection Error:', err));

async function main() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

const seedDatabase = async () => {
  try {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: '68766fef6dae81a4a9a5d636' // Use your actual user ObjectId here
    }));
    await Listing.insertMany(initData.data);
    console.log('✅ Database seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
