const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_dev', // ✅ Moved inside params
    allowed_formats: ['jpg', 'png', 'jpeg'], // ✅ Should be 'allowed_formats' with underscore
    // Optional: You can also define public_id if needed
    // public_id: (req, file) => 'custom-name'
  },
});

module.exports = { cloudinary, storage };
