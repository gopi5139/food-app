const mongoose = require('mongoose');

const ApartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true // Ensures case insensitivity
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Apartment = mongoose.model('Apartment', ApartmentSchema);

module.exports = Apartment;
