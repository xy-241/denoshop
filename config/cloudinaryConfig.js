const cloudinary = require('cloudinary').v2;
const cloudinaryConfigObj = require('./cloudinary');
cloudinary.config(cloudinaryConfigObj);

module.exports = cloudinary;