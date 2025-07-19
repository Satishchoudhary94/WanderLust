require('dotenv').config();

const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

const MONGO_URI = 'mongodb+srv://schoudhary3741:7y7EW1oIqPGKRpKk@cluster0.d6ptcxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0L';

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
      owner: '687b754ce209210aa6d36231',
      geometry: obj.geometry || {
        type: 'Point',
        coordinates: [77.2090, 28.6139]
      }
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
