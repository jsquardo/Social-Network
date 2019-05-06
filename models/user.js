const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});

// Virtual Field
userSchema
  .virtual("password")
  .set(function(password) {
    // Create temp var called _password
    this._password = password;
    // Generate a timestamp
    this.salt = uuidv1();
    // Encrypt the password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// methods
userSchema.methods = {
  encryptPassword: function(password) {
    if (!password) return "";
  }
};

module.exports = mongoose.model("User", userSchema);
