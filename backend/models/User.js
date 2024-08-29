const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  jobPosition: String, // New field for Job Position
  resume: {
    id: mongoose.Schema.Types.ObjectId,
    contentType: String
  }
});

module.exports = mongoose.model('User', userSchema);
